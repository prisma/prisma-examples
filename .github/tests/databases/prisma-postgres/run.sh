#!/bin/sh

set -eu

npm install

echo "🚀 Starting Prisma Dev in the background..."

TMP_LOG="./prisma-dev.log"
rm -f "$TMP_LOG"
touch "$TMP_LOG"

# Start Prisma Dev and log output
npx prisma dev --debug > "$TMP_LOG" 2>&1 &
PRISMA_PID=$!

# Ensure Prisma is killed on exit
cleanup() {
  echo "🧹 Cleaning up Prisma Dev (PID $PRISMA_PID)..."
  kill $PRISMA_PID 2>/dev/null || true
  wait $PRISMA_PID 2>/dev/null || true
}
trap cleanup EXIT

echo "⏳ Waiting for Prisma Dev to provide DATABASE_URL..."
while ! grep -q 'DATABASE_URL="prisma+postgres://' "$TMP_LOG"; do
  sleep 1
done

DB_URL=$(grep 'DATABASE_URL="prisma+postgres://' "$TMP_LOG" | tail -1 | sed -E 's/.*DATABASE_URL="([^"]+)".*/\1/')

if [[ "$OSTYPE" == "darwin"* ]]; then
  echo "$DB_URL" | pbcopy
  echo "✅ Copied DATABASE_URL to clipboard."
else
  echo "📋 DATABASE_URL:"
  echo "$DB_URL"
fi

export DATABASE_URL="$DB_URL"

echo "🚀 Running prisma migrate dev"
npx prisma migrate dev --name init

echo "🚀 Running queries..."
npm run queries
