declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      OPTIMIZE_API_KEY: string | undefined
    }
  }
}

export {}
