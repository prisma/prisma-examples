#!/bin/sh

set -eu

branch="$1"

if [ "$branch" = "patch-dev" ]; then
    patchDevForLatestExists=$(node .github/scripts/patch-dev-for-latest.js)
    if [ "$patchDevForLatestExists" = "false" ]; then
        echo "Exiting because there is no 'patch-dev' released for the current latest"
        exit 0
    fi
fi

no_negatives () {
  echo "$(( $1 < 0 ? 0 : $1 ))"
}

echo "setting up ssh repo"

mkdir -p ~/.ssh
echo "$SSH_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
ssh-keyscan github.com >> ~/.ssh/known_hosts

git config --global user.email "prismabots@gmail.com"
git config --global user.name "Prismo"

git remote add github "git@github.com:$GITHUB_REPOSITORY.git"
git fetch github "$branch"
git reset --hard "github/$branch"

# since GH actions are limited to 5 minute cron jobs, just run this continuously for 5 minutes
minutes=5 # cron job runs each x minutes
interval=10 # run each x seconds
i=0
count=$(((minutes * 60) / interval))
echo "running loop $count times"
while [ $i -le $count ]; do
  # increment to prevent forgetting incrementing, and also prevent overlapping with the next 5-minute job
  i=$(( i + 1 ))
  echo "run $i"

  start=$(date "+%s")

  dir=$(pwd)

  git fetch github "$branch"
  git reset --hard "github/$branch"
  packages=$(find . -not -path "*/node_modules/*" -type f -name "package.json")

  echo "checking info..."

  v=$(sh .github/scripts/prisma-version.sh "$branch")

  echo "$packages" | tr ' ' '\n' | while read -r item; do
    echo "checking $item"

    case "$item" in
      *".github"*)
        echo "ignoring $item"
        continue
        ;;
    esac

    cd "$(dirname "$item")/"

    vCLI="$(node -e "console.log(require('./package.json').devDependencies['prisma'])")"

    if [ "$vCLI" != "" ]; then
      if [ "$v" != "$vCLI" ]; then
        echo "$item: prisma expected $v, actual $vCLI"
        yarn add --ignore-engines "prisma@$v" --dev
      fi

      vPrismaClient="$(node -e "console.log(require('./package.json').dependencies['@prisma/client'])")"

      if [ "$v" != "$vPrismaClient" ]; then
        echo "$item: @prisma/client expected $v, actual $vPrismaClient"
        yarn add --ignore-engines "@prisma/client@$v"
      fi
    fi

    cd "$dir"
  done

  if [ -z "$(git status -s)" ]; then
    echo "no changes"
    end=$(date "+%s")
    diff=$(echo "$end - $start" | bc)
    remaining=$((interval - 1 - diff))
    echo "took $diff seconds, sleeping for $remaining seconds"
    sleep "$(no_negatives $remaining)"

    continue
  fi

  echo "changes, upgrading..."

  echo "$v" > .github/prisma-version.txt

  git commit -am "chore(packages): bump prisma to $v"

  # fail silently if the unlikely event happens that this change already has been pushed either manually
  # or by an overlapping upgrade action
  git pull github "$branch" --rebase || true

  set +e
  git push github "HEAD:refs/heads/$branch"
  code=$?
  set -e
  echo "pushed commit"

  if [ $code -eq 0 ]; then
    export version="$v"

    export webhook="$SLACK_WEBHOOK_URL_FAILING"
    (cd .github/slack/ && yarn install)
    node .github/slack/notify.js --branch-name $branch "Prisma version $v released via the action https://github.com/prisma/prisma-examples/actions/runs/$GITHUB_RUN_ID?check_suite_focus=true"
  fi

  echo "pushed commit"

  end=$(date "+%s")
  diff=$(echo "$end - $start" | bc)
  remaining=$((interval - 1 - diff))
  # upgrading usually takes longer than a few individual loop runs, so skip test runs which would have passed by now
  skip=$((remaining / interval))
  i=$((i - skip))
  echo "took $diff seconds, skipping $skip x $interval second runs"
done

echo "done"
