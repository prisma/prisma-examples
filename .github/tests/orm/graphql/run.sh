#!/bin/bash

set -eu

echo "🔍 Starting test setup for graphql..."

echo "📂 Current working directory before REPO_ROOT: $(pwd)"
echo "📁 Listing contents:"
ls -la

REPO_ROOT="$(git rev-parse --show-toplevel)"
echo "📌 Detected repo root: $REPO_ROOT"

cd "$REPO_ROOT/orm/graphql"
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

popd > /dev/null  # Back to orm/graphql

# Run migrations and seed
npx prisma migrate reset --force --skip-seed
npx prisma migrate dev --name init
npx prisma db seed

# Start the app
npm run dev &
pid=$!

sleep 20

# Run GraphQL Postman collection
echo "🧪 Running Postman tests..."
npx newman run "$REPO_ROOT/.github/tests/postman_collections/graphql.json" --bail

# Cleanup
echo "🛑 Shutting down app (PID $pid) and Prisma Dev (PID $NODE_PID)..."
kill "$pid"
kill "$NODE_PID"
wait "$NODE_PID" || true
