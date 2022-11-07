import type { Post } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch('/api/feed');

  return { feed: (await response.json()) as Post[] };
};
