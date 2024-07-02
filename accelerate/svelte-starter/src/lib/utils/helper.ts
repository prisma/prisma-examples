import { browser } from '$app/environment';

export async function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

// Use the appropriate environment variable based on the environment (server or browser)
export const HOST = browser ? import.meta.env.VITE_PUBLIC_URL : process.env.VITE_PUBLIC_URL;
