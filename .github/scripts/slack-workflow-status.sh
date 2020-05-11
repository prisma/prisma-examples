#!/bin/sh

set -eu

(cd .github/slack/ && yarn install --silent)

emoji="$1"

export webhook="$SLACK_WEBHOOK_URL_FAILING"
version="$(cat .github/prisma-version.txt)"
branch="$(git rev-parse --abbrev-ref HEAD)"
sha="$(git rev-parse HEAD)"
short_sha="$(echo "$sha" | cut -c -7)"
message="$(git log -1 --pretty=%B | head -n 1)"

commit_link="\`<https://github.com/prisma/prisma-examples/commit/$sha|$branch@$short_sha>\`"
workflow_link="<https://github.com/prisma/prisma-examples/actions/runs/$GITHUB_RUN_ID|$message>"

node .github/slack/notify.js "prisma@$version: $emoji $workflow_link (via $commit_link)"
