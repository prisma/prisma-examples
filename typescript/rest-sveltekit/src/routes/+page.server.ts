import type { Post } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  const response = await fetch(`${url.origin}/api/feed`);

  return { feed: (await response.json()) as Post[] };
};
