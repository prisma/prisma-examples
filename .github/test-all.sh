#!/bin/sh

set -eu

dir="$(pwd)"

packages=$(find "." -not -path "*/node_modules/*" -type f -name "package.json")

echo "$packages" | tr ' ' '\n' | while read -r item; do
	echo "---------------------"
	echo "running $item"

	case "$item" in
		*".github"*|*"experimental"*|*"deployment-platforms"*|*"graphql-nextjs"*|*"graphql-auth"*)
			echo "ignoring $item"
			continue
			;;
	esac

	cd "$(dirname "$item")/"

	## ACTION
	yarn install
	yarn prisma2 generate

	run_file="$dir/.github/tests/$(dirname $item)/run.sh"

	if [ -f "$run_file" ]; then
		sh "$run_file"
	else
		# TODO in the future, fail if no run.sh exists to force testing all examples
		echo "no test file set up for $item, skipping"
	fi

	## END

	echo "$item done"
	cd "$dir"
done
