export async function delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }
  
  export const HOST = process.env.NUXT_PUBLIC_URL ?? "http://localhost:3000";
  