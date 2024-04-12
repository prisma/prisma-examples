// global.d.ts
declare namespace NodeJS {
  export interface ProcessEnv {
    PULSE_API_KEY: string | undefined;
    RESEND_API_KEY: string | undefined;
  }
}
