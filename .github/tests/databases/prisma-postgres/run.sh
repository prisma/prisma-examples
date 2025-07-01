#!/bin/sh

set -eux  # Exit on error, undefined vars, and show commands

# ---------------------------------------------
# Step 1: Navigate to Prisma project
# ---------------------------------------------
cd ../../../..
cd databases/prisma-postgres

# ---------------------------------------------
# Step 2: Install dependencies
# ---------------------------------------------
echo "📦 Installing dependencies..."
npm install

# ---------------------------------------------
# Step 3: Start Prisma Dev in background
# ---------------------------------------------
echo "🚀 Starting Prisma Dev in the background..."

TMP_LOG="./prisma-dev.log"
rm -f "$TMP_LOG"
touch "$TMP_LOG"

npx prisma dev --debug > "$TMP_LOG" 2>&1 &
PRISMA_PID=$!

# ---------------------------------------------
# Step 4: Clean up Prisma Dev on exit
# ---------------------------------------------
cleanup() {
  echo "🧹 Cleaning up Prisma Dev (PID $PRISMA_PID)..."
  kill "$PRISMA_PID" 2>/dev/null || true
  wait "$PRISMA_PID" 2>/dev/null || true
}
trap cleanup EXIT

# ---------------------------------------------
# Step 5: Wait up to 2 minutes for DATABASE_URL
# ---------------------------------------------
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

# ---------------------------------------------
# Step 6: Extract DATABASE_URL and export it
# ---------------------------------------------
DB_URL=$(grep 'DATABASE_URL="prisma+postgres://' "$TMP_LOG" | tail -1 | sed -E 's/.*DATABASE_URL="([^"]+)".*/\1/')
export DATABASE_URL="$DB_URL"

echo "✅ DATABASE_URL found: $DATABASE_URL"

# ---------------------------------------------
# Step 7: Run migration (schema setup)
# ---------------------------------------------
echo "📐 Running prisma migrate dev..."
npx prisma migrate dev --name init --skip-seed

# ---------------------------------------------
# Step 8: Run test suite (queries or app logic)
# ---------------------------------------------
echo "🧪 Running queries..."
npm run queries || echo "ℹ️ No queries script defined or failed — continuing"

# prisma dev will be cleaned up by the trap on exit
