#!/bin/sh

set -eu

channel="dev"

mkdir -p ~/.ssh
echo "$SSH_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
ssh-keyscan github.com >> ~/.ssh/known_hosts

git config --global user.email "prismabots@gmail.com"
git config --global user.name "Prismo"

git remote add github "git@github.com:$GITHUB_REPOSITORY.git"

sh .github/scripts/upgrade-all.sh "$channel"

git commit -am "chore: sync, use $(sh .github/scripts/prisma-version.sh "$channel")"

# fail silently if the unlikely event happens that this change already has been pushed either manually
# or by an overlapping upgrade action
git pull github "${GITHUB_REF}" --rebase || true

# force-push to $channel
git push github "HEAD:refs/heads/$channel" --force
