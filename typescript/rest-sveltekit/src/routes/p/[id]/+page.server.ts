import type { Post } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, params: { id } }) => {
  const response = await fetch(`${url.origin}/api/post/${id}`);

  return { post: (await response.json()) as Post };
};
