#!/bin/sh

set -eu

item="$1"
dir="$(pwd)"

echo ""
echo ""
echo ""
echo ""
echo ""
echo ""
echo "---------------------"
echo "running $item"

case "$item" in
  *".github"*|*"deployment-platforms"*|*"databases"*)
    echo "ignoring $item"
    exit 0
    ;;
esac

cd "$(dirname "$item")/"

## ACTION
yarn install
yarn prisma generate

echo "+++++++++++"
echo "executing .github/tests/$(dirname "$item")/run.sh (tests)"
run_file="$dir/.github/tests/$(dirname "$item")/run.sh"

if [ -f "$run_file" ]; then
  set +e
  sh "$run_file"
  code=$?
  set -e

  cd "$dir"

  if [ $code -ne 0 ]; then
    echo "$(dirname "$item") failed"

    if [ "$GITHUB_REF" = "refs/heads/latest" ] || [ "$GITHUB_REF" = "refs/heads/dev" ] || [ "$GITHUB_REF" = "refs/heads/patch-dev" ]; then
      (cd .github/slack/ && yarn install --silent)

      export webhook="$SLACK_WEBHOOK_URL_FAILING"

      version="$(cat .github/prisma-version.txt)"
      branch="$(git rev-parse --abbrev-ref HEAD)"
      sha="$(git rev-parse HEAD)"
      short_sha="$(echo "$sha" | cut -c -7)"
      message="$(git log -1 --pretty=%B)"

      commit_link="\`<https://github.com/prisma/prisma-examples/commit/$sha|$branch@$short_sha>\`"
      workflow_link="<https://github.com/prisma/prisma-examples/actions/runs/$GITHUB_RUN_ID|$message>"

      node .github/slack/notify.js "prisma@$version: $(dirname "$item") :x: $workflow_link (via $commit_link)"
    fi

    exit $code
  fi
else
  echo "no test file set up for $item,"
  echo "please create a test shell file at $run_file"
  exit 1
fi

## END

echo "$item done"

# somehow ports are still in use in GitHub actions, so kill everything here again
pkill node || true
