export const load = async ({ fetch }) => {
  const response = await fetch('/api/feed')

  return { feed: await response.json() }
}
