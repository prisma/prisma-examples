export const load = async ({ fetch, params: { id } }) => {
  const response = await fetch(`/api/post/${id}`)

  return { post: await response.json() }
}
