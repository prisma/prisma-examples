#!/bin/sh

set -eu

dir=$1

echo "running $dir tests"

packages=$(find "." -not -path "*/node_modules/*" -type f -name "package.json")

channel="alpha"
v=$(yarn info prisma2@$channel --json | jq '.data["dist-tags"].alpha' | tr -d '"')

dir=$(pwd)

echo "$packages" | tr ' ' '\n' | while read -r item; do
	case "$item" in
		*".github"*|*"experimental"*|*"deployment-platforms"*)
			echo "ignoring $item"
			continue
			;;
	esac

	echo "running $item"
	cd "$(dirname "$item")/"

	## ACTION
	yarn add "prisma2@$v" --dev
	yarn add "@prisma/client@$v"
	## END

	echo "$item done"
	cd "$dir"
done
