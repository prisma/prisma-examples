#!/bin/bash

set -eu

echo "🔍 Starting test setup for graphql-subscriptions..."

echo "📂 Current working directory before REPO_ROOT: $(pwd)"
echo "📁 Listing contents:"
ls -la

REPO_ROOT="$(git rev-parse --show-toplevel)"
echo "📌 Detected repo root: $REPO_ROOT"

cd "$REPO_ROOT/orm/graphql-subscriptions"
echo "📂 Changed directory to: $(pwd)"

echo "📦 Installing test deps..."
npm install

# Go to Node script dir and install its deps
NODE_SCRIPT_DIR="../../.github/get-ppg-dev"
pushd "$NODE_SCRIPT_DIR" > /dev/null
npm install

# Start Prisma Dev server
LOG_FILE="./ppg-dev-url.log"
rm -f "$LOG_FILE"
touch "$LOG_FILE"

echo "🚀 Starting Prisma Dev in background..."
node index.js >"$LOG_FILE" &
NODE_PID=$!

# Wait for DATABASE_URL
echo "🔎 Waiting for Prisma Dev to emit DATABASE_URL..."
MAX_WAIT=60
WAITED=0
until grep -q '^prisma+postgres://' "$LOG_FILE"; do
  sleep 1
  WAITED=$((WAITED + 1))
  if [ "$WAITED" -ge "$MAX_WAIT" ]; then
    echo "❌ Timeout waiting for DATABASE_URL"
    cat "$LOG_FILE"
    kill "$NODE_PID" || true
    exit 1
  fi
done

DB_URL=$(grep '^prisma+postgres://' "$LOG_FILE" | tail -1)
export DATABASE_URL="$DB_URL"
echo "✅ DATABASE_URL: $DATABASE_URL"

popd > /dev/null  # Back to orm/graphql-subscriptions

# Run migrations and seed
npx prisma migrate dev --name init
npx prisma db seed

# Start the GraphQL subscriptions server
echo "🚀 Starting app..."
npm run dev &
pid=$!

sleep 15

# Run test query
echo "🔎 Running sample GraphQL query..."
curl --fail 'http://localhost:4000/graphql' \
  -H 'Accept-Encoding: gzip, deflate, br' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Connection: keep-alive' \
  -H 'DNT: 1' \
  -H 'Origin: http://localhost:4000' \
  --data-binary '{"query":"query {\n  feed {\n    id\n    title\n    content\n  }\n}"}' \
  --compressed

# Cleanup
echo "🛑 Shutting down app (PID $pid) and Prisma Dev (PID $NODE_PID)..."
kill "$pid"
kill "$NODE_PID"
wait "$NODE_PID" || true
