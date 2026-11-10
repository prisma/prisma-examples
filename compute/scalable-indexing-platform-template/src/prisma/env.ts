// The seed scripts run outside Next.js, so nothing loads .env.local for them.
// Load it here, and fail with a readable message when there is no database URL.
export function loadEnv(): void {
  try {
    process.loadEnvFile?.(".env.local");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  if (!process.env.DATABASE_URL) {
    console.error(
      "DATABASE_URL is not set. Copy .env.example to .env.local and set it to your PostgreSQL connection string.",
    );
    process.exit(1);
  }
}
