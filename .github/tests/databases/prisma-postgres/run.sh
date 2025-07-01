#!/bin/bash
set -euo pipefail

# Move to Prisma project
cd ../../../..
cd databases/prisma-postgres

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
  if [[ "$WAITED" -ge "$MAX_WAIT" ]]; then
    echo "❌ Timeout waiting for DATABASE_URL"
    cat "$LOG_FILE"
    kill "$NODE_PID" || true
    exit 1
  fi
done

DB_URL=$(grep '^prisma+postgres://' "$LOG_FILE" | tail -1)
export DATABASE_URL="$DB_URL"
echo "✅ DATABASE_URL: $DATABASE_URL"

popd > /dev/null  # Go back to databases/prisma-postgres

# Run migration
echo "📐 Running prisma migrate dev..."
npx prisma migrate dev --name init --skip-seed

# Run queries (if any)
echo "🧪 Running queries..."
npm run queries || echo "ℹ️ No queries script defined."

# Cleanup
echo "🛑 Shutting down Prisma Dev (PID $NODE_PID)..."
kill "$NODE_PID"
wait "$NODE_PID" || true
