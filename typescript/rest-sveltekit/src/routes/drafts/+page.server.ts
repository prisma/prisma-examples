import type { Post } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch('/api/drafts');

  return { drafts: (await response.json()) as Post[] };
};
