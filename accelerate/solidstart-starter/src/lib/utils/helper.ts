export const formatDate = (date: string | undefined): string => {
    return date ? new Date(date).toLocaleString() : 'N/A';
};
  
export async function delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }
  
export const HOST = process.env.SOLID_START_PUBLIC_URL ?? "http://localhost:3000";