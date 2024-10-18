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
