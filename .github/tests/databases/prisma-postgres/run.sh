#!/bin/sh

set -eu

# ---------------------------------------------
# Step 1: Navigate to actual project directory
# ---------------------------------------------
cd ../../../..
cd databases/prisma-postgres

# ---------------------------------------------
# Step 2: Install dependencies
# ---------------------------------------------
echo "📦 Installing dependencies..."
npm install

# ---------------------------------------------
# Step 3: Start Prisma Dev in background (non-blocking)
# ---------------------------------------------
echo "🚀 Starting Prisma Dev in the background..."

TMP_LOG="./prisma-dev.log"
rm -f "$TMP_LOG"
touch "$TMP_LOG"

npx prisma dev --debug > "$TMP_LOG" 2>&1 &
PRISMA_PID=$!

# ---------------------------------------------
# Step 4: Clean up prisma dev on exit
# ---------------------------------------------
cleanup() {
  echo "🧹 Cleaning up Prisma Dev (PID $PRISMA_PID)..."
  kill $PRISMA_PID 2>/dev/null || true
  wait $PRISMA_PID 2>/dev/null || true
}
trap cleanup EXIT

# ---------------------------------------------
# Step 5: Wait for DATABASE_URL (2-minute timeout)
# ---------------------------------------------
echo "⏳ Waiting for Prisma Dev to provide DATABASE_URL (timeout: 2 minutes)..."

MAX_WAIT=120  # seconds
WAITED=0
until grep -q 'DATABASE_URL="prisma+postgres://' "$TMP_LOG"; do
  sleep 1
  WAITED=$((WAITED + 1))
  if [ "$WAITED" -ge "$MAX_WAIT" ]; then
    echo "❌ Timed out after $MAX_WAIT seconds waiting for Prisma Dev to provide DATABASE_URL"
    echo "📄 Log output:"
    cat "$TMP_LOG"
    exit 1
  fi
done

# ---------------------------------------------
# Step 6: Extract and use DATABASE_URL
# ---------------------------------------------
DB_URL=$(grep 'DATABASE_URL="prisma+postgres://' "$TMP_LOG" | tail -1 | sed -E 's/.*DATABASE_URL="([^"]+)".*/\1/')

if [[ "${OSTYPE:-}" == "darwin"* ]]; then
  echo "$DB_URL" | pbcopy
  echo "✅ Copied DATABASE_URL to clipboard."
else
  echo "📋 DATABASE_URL:"
  echo "$DB_URL"
fi

export DATABASE_URL="$DB_URL"

# ---------------------------------------------
# Step 7: Apply schema using migrate (optional)
# ---------------------------------------------
echo "📐 Running prisma migrate dev"
npx prisma migrate dev --name init --skip-seed

# ---------------------------------------------
# Step 8: Run queries/test suite
# ---------------------------------------------
echo "🧪 Running queries..."
npm run queries || echo "ℹ️ No queries script defined."
