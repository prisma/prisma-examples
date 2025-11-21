interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly CLERK_WEBHOOK_SIGNING_SECRET: string;
  readonly CLERK_SECRET_KEY: string;
  readonly CLERK_PUBLISHABLE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
