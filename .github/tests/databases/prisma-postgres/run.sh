#!/bin/bash
set -euo pipefail

cd ../../../..
cd databases/prisma-postgres

echo "📦 Installing deps..."
npm install

echo "🚀 Starting Prisma Dev in background..."
node ../../.github/get-ppg-dev/index.js &
DEV_PID=$!

# Ensure it's cleaned up on exit
cleanup() {
  echo "🧹 Cleaning up Prisma Dev (PID $DEV_PID)..."
  kill "$DEV_PID" || true
  wait "$DEV_PID" || true
}
trap cleanup EXIT

# Wait for env file
ENV_FILE="/tmp/prisma-dev-env.json"
echo "⏳ Waiting for DATABASE_URL to be written..."
for i in {1..60}; do
  if [ -f "$ENV_FILE" ]; then
    break
  fi
  sleep 1
done

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Timed out waiting for DATABASE_URL file"
  exit 1
fi

# Export DATABASE_URL into shell
export DATABASE_URL=$(jq -r '.DATABASE_URL' "$ENV_FILE")
echo "✅ DATABASE_URL: $DATABASE_URL"

echo "📐 Running prisma migrate dev..."
npx prisma migrate dev --name init --skip-seed

echo "🧪 Running queries..."
npm run queries || echo "ℹ️ No queries script defined."
