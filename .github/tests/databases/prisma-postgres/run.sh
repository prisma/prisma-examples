#!/bin/bash
set -euo pipefail

# 📁 Go to your test project directory
cd ../../../..
cd databases/prisma-postgres

echo "📦 Installing dependencies..."
npm install

# 🚀 Start Prisma Dev via Node script
NODE_SCRIPT="../../.github/get-ppg-dev/index.js"
LOG_FILE="./ppg-dev-url.log"

rm -f "$LOG_FILE"
node "$NODE_SCRIPT" >"$LOG_FILE" &
NODE_PID=$!

# ⏳ Wait for DATABASE_URL to be printed
echo "🔎 Waiting for Prisma Dev to emit DATABASE_URL..."
for i in {1..30}; do
  if grep -q '^prisma+postgres://' "$LOG_FILE"; then
    break
  fi
  sleep 1
done

if ! grep -q '^prisma+postgres://' "$LOG_FILE"; then
  echo "❌ Timed out waiting for DATABASE_URL"
  cat "$LOG_FILE"
  kill "$NODE_PID" || true
  exit 1
fi

export DATABASE_URL=$(grep '^prisma+postgres://' "$LOG_FILE" | tail -1)
echo "✅ DATABASE_URL: $DATABASE_URL"

# 🧱 Run migrations and queries
npx prisma migrate dev --name init

echo "🧪 Running queries..."
npm run queries || echo "ℹ️ No queries script defined."

# 🛑 Clean up Prisma Dev
echo "👋 Shutting down Prisma Dev (PID $NODE_PID)..."
kill "$NODE_PID"
wait "$NODE_PID" || true
