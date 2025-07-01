#!/bin/sh

set -eux

cd ../../../..
cd databases/prisma-postgres

echo "📦 Installing dependencies..."
npm install

echo "🚀 Starting Prisma Dev in the background..."
TMP_LOG="./prisma-dev.log"
rm -f "$TMP_LOG"
touch "$TMP_LOG"

# Start prisma dev in background and keep it running
npx prisma dev --debug > "$TMP_LOG" 2>&1 &
PRISMA_PID=$!

# Cleanup when script exits
cleanup() {
  echo "🧹 Cleaning up Prisma Dev (PID $PRISMA_PID)..."
  kill "$PRISMA_PID" 2>/dev/null || true
  wait "$PRISMA_PID" 2>/dev/null || true
}
trap cleanup EXIT

# Wait for DATABASE_URL output
echo "⏳ Waiting for Prisma Dev to provide DATABASE_URL..."
MAX_WAIT=120
WAITED=0
until grep -q 'DATABASE_URL="prisma+postgres://' "$TMP_LOG"; do
  sleep 1
  WAITED=$((WAITED + 1))
  if [ "$WAITED" -ge "$MAX_WAIT" ]; then
    echo "❌ Timed out after $MAX_WAIT seconds waiting for DATABASE_URL"
    cat "$TMP_LOG"
    exit 1
  fi
done

echo "✅ DATABASE_URL found"
DB_URL=$(grep 'DATABASE_URL="prisma+postgres://' "$TMP_LOG" | tail -1 | sed -E 's/.*DATABASE_URL="([^"]+)".*/\1/')
export DATABASE_URL="$DB_URL"
echo "📋 DATABASE_URL: $DATABASE_URL"

# Prisma Dev is still running — now run migrate and queries
echo "📐 Running prisma migrate dev..."
npx prisma migrate dev --name init --skip-seed

echo "🧪 Running queries..."
npm run queries || echo "ℹ️ No queries script defined."
