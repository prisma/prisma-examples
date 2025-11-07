#!/bin/bash

set -eu

echo "🔍 Starting test setup for nextjs..."

echo "📂 Current working directory before REPO_ROOT: $(pwd)"
echo "📁 Listing contents:"
ls -la

REPO_ROOT="$(git rev-parse --show-toplevel)"
echo "📌 Detected repo root: $REPO_ROOT"

cd "$REPO_ROOT/orm/nextjs"
echo "📂 Changed directory to: $(pwd)"

# Go to Node script dir and install its deps FIRST
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
until grep -q '^postgres://' "$LOG_FILE"; do
  sleep 1
  WAITED=$((WAITED + 1))
  if [ "$WAITED" -ge "$MAX_WAIT" ]; then
    echo "❌ Timeout waiting for DATABASE_URL"
    cat "$LOG_FILE"
    kill "$NODE_PID" || true
    exit 1
  fi
done

# Extract both URLs: first line is Accelerate URL, second is TCP URL
ACCELERATE_URL=$(sed -n '1p' "$LOG_FILE")
TCP_URL=$(sed -n '2p' "$LOG_FILE")

# Use TCP URL for everything (including seed with driver adapters)
export DATABASE_URL="$TCP_URL"
echo "✅ Accelerate URL: $ACCELERATE_URL"
echo "✅ TCP URL (used): $TCP_URL"

popd > /dev/null  # Back to orm/nextjs

echo "📦 Installing test deps..."
npm install

# Run migrations and seed
npx prisma migrate dev --name init
npx prisma db seed

# Start the app
echo "🚀 Starting Next.js app..."
npm run dev &
pid=$!

sleep 15

# Check frontend
echo "🔎 Verifying root frontend route..."
curl --fail 'http://localhost:3000/'

# Cleanup
echo "🛑 Shutting down Next.js app (PID $pid) and Prisma Dev (PID $NODE_PID)..."
kill "$pid"
kill "$NODE_PID"
wait "$NODE_PID" || true
