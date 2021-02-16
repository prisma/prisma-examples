#!/bin/sh

set -eu

channel="$1"

echo "upgrading all packages"

packages=$(find "." -not -path "*/node_modules/*" -type f -name "package.json")

version=$(sh .github/scripts/prisma-version.sh "$channel")

dir=$(pwd)

echo "$packages" | tr ' ' '\n' | while read -r item; do
  case "$item" in
    *".github"*|*"deployment-platforms"*)
      echo "ignoring $item"
      continue
      ;;
  esac

  echo "running $item"
  cd "$(dirname "$item")/"

  pkg="var pkg=require('./package.json')"
  dependsOnNexus="$(node -e "$pkg;console.log(!!pkg.dependencies['nexus-plugin-prisma'])")"

  ## ACTION
  if [ "$dependsOnNexus" = "true" ]; then
    echo "$item is a nexus project, ignoring dependencies"
  else
    yarn add --ignore-engines "prisma@$version" --dev
    yarn add --ignore-engines "@prisma/client@$version"
  fi
  ## END

  echo "$item done"
  cd "$dir"
done
