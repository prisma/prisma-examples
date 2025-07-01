#!/bin/sh

set -eux

# Step 1: Go to Prisma project
cd ../../../..
cd databases/prisma-postgres

# Step 2: Install deps
echo "📦 Installing dependencies..."
npm install

# Step 3: Start prisma dev in background
echo "🚀 Starting Prisma Dev in the background..."
TMP_LOG="./prisma-dev.log"
rm -f "$TMP_LOG"
touch "$TMP_LOG"

# Use stdbuf to force unbuffered output
stdbuf -oL -eL npx prisma dev --debug > "$TMP_LOG" 2>&1 &
PRISMA_PID=$!

# Ensure prisma dev gets cleaned up
cleanup() {
  echo "🧹 Cleaning up Prisma Dev (PID $PRISMA_PID)..."
  kill "$PRISMA_PID" 2>/dev/null || true
  wait "$PRISMA_PID" 2>/dev/null || true
}
trap cleanup EXIT

# Step 4: Wait up to 2 minutes for Prisma Dev to emit connection info
echo "⏳ Waiting for Prisma Dev to be ready..."
MAX_WAIT=120
WAITED=0

until grep -q 'server started on port' "$TMP_LOG"; do
  sleep 1
  WAITED=$((WAITED + 1))
  if [ "$WAITED" -ge "$MAX_WAIT" ]; then
    echo "❌ Timed out after $MAX_WAIT seconds waiting for Prisma Dev"
    cat "$TMP_LOG"
    exit 1
  fi
done

# Step 5: Extract DATABASE_URL (prefer prisma+postgres, fallback to postgres)
DB_URL=$(grep -o 'prisma+postgres://[^"]*' "$TMP_LOG" | tail -1 || true)
if [ -z "$DB_URL" ]; then
  DB_URL=$(grep -o 'postgres://[^"]*' "$TMP_LOG" | tail -1)
fi

if [ -z "$DB_URL" ]; then
  echo "❌ Could not extract DATABASE_URL"
  cat "$TMP_LOG"
  exit 1
fi

export DATABASE_URL="$DB_URL"
echo "✅ DATABASE_URL: $DATABASE_URL"

# Step 6: Migrate + run queries while dev is alive
echo "📐 Running prisma migrate dev..."
npx prisma migrate dev --name init --skip-seed

echo "🧪 Running queries..."
npm run queries || echo "ℹ️ No queries script defined."
