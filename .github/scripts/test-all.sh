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
		set +e
		sh "$run_file"
		code=$?
		set -e

		cd "$dir"

		if [ $code -ne 0 ]; then
			echo "$(dirname $item) failed"

			if [ "$GITHUB_REF" = "refs/heads/prisma2" ]; then
				export webhook="$SLACK_WEBHOOK_URL_FAILING"
				version="$(cat .github/prisma-version.txt)"
				sha="$(git rev-parse HEAD | cut -c -7)"
				(cd .github/slack/ && yarn install --silent)
				node .github/slack/notify.js "\`$sha\`: $(dirname $item) failed using prisma@$version"
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
done
