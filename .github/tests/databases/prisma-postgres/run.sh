#!/bin/bash
set -euo pipefail

# Cleanup function
cleanup() {
  echo "🧹 Cleaning up Prisma Dev (PID $PRISMA_PID)..."
  kill "$PRISMA_PID" || true
  wait "$PRISMA_PID" || true
}
trap cleanup EXIT

echo "📦 Installing dependencies..."
cd ../../../..
cd databases/prisma-postgres
npm install

# ---------------------------------------------
# Step 1: Start prisma dev and log output
# ---------------------------------------------
echo "🚀 Starting Prisma Dev in the background..."
TMP_LOG="./prisma-dev.log"
rm -f "$TMP_LOG"
touch "$TMP_LOG"

stdbuf -oL -eL npx prisma dev --debug >"$TMP_LOG" 2>&1 &

PRISMA_PID=$!
echo "⏳ Waiting for Prisma Dev to emit success signal..."

MAX_WAIT=180
WAITED=0
until grep -q 'Great Success' "$TMP_LOG"; do
  sleep 1
  WAITED=$((WAITED + 1))
  if [ "$WAITED" -ge "$MAX_WAIT" ]; then
    echo "❌ Timeout waiting for Prisma Dev to start"
    cat "$TMP_LOG"
    exit 1
  fi
done

# ---------------------------------------------
# Step 2: Extract DATABASE_URL
# ---------------------------------------------
DB_URL=$(grep -o 'postgres://[^"]*' "$TMP_LOG" | tail -1 || true)
if [ -z "$DB_URL" ]; then
  echo "❌ Could not extract DATABASE_URL"
  cat "$TMP_LOG"
  exit 1
fi

echo "✅ Extracted DATABASE_URL: $DB_URL"
export DATABASE_URL="$DB_URL"

# ---------------------------------------------
# Step 3: Migrate
# ---------------------------------------------
echo "📐 Running prisma migrate dev"
npx prisma migrate dev --name init --skip-seed

# ---------------------------------------------
# Step 4: Run test queries
# ---------------------------------------------
echo "🧪 Running queries..."
npm run queries || echo "ℹ️ No queries script defined."
