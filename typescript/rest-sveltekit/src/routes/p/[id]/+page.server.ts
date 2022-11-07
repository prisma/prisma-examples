import type { Post } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params: { id } }) => {
  const response = await fetch(`/api/post/${id}`);

  return { post: (await response.json()) as Post };
};
