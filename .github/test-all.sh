#!/bin/sh

set -eu

dir="$(pwd)"

packages=$(find "." -not -path "*/node_modules/*" -type f -name "package.json")

echo "$packages" | tr ' ' '\n' | while read -r item; do
	echo "---------------------"
	echo "running $item"

	case "$item" in
		*".github"*|*"experimental"*|*"deployment-platforms"*)
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
		echo "no test file set up for $item,"
		echo "please create a test shell file at $run_file"
		exit 1
	fi

	## END

	echo "$item done"
	cd "$dir"

	# somehow ports are still in use in GitHub actions, so kill everything here again
	pkill node || true
done
