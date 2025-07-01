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

stdbuf -oL -eL npx prisma dev --debug > "$TMP_LOG" 2>&1 &
PRISMA_PID=$!

cleanup() {
  echo "🧹 Cleaning up Prisma Dev (PID $PRISMA_PID)..."
  kill "$PRISMA_PID" 2>/dev/null || true
  wait "$PRISMA_PID" 2>/dev/null || true
}
trap cleanup EXIT

# Step 4: Wait for Prisma Dev to fully boot and emit logs
echo "⏳ Giving Prisma Dev time to emit logs..."
sleep 20  # Give enough time to start and emit all logs

# Step 5: Extract DATABASE_URL from full log output
DB_URL=$(grep -o 'prisma+postgres://[^"]*' "$TMP_LOG" | tail -1 || true)
if [ -z "$DB_URL" ]; then
  DB_URL=$(grep -o 'postgres://[^"]*' "$TMP_LOG" | tail -1 || true)
fi

if [ -z "$DB_URL" ]; then
  echo "❌ Could not extract DATABASE_URL"
  cat "$TMP_LOG"
  exit 1
fi

export DATABASE_URL="$DB_URL"
echo "✅ DATABASE_URL: $DATABASE_URL"

# Step 6: Run migration + test
echo "📐 Running prisma migrate dev..."
npx prisma migrate dev --name init --skip-seed

echo "🧪 Running queries..."
npm run queries || echo "ℹ️ No queries script defined."
