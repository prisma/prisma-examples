"use server";

import { revalidatePath, updateTag } from "next/cache";

/**
 * On-demand cache invalidation action
 */
export async function revalidateCatalog() {
  updateTag("resources");
  revalidatePath("/", "page");
  return { revalidated: true, timestamp: Date.now() };
}
