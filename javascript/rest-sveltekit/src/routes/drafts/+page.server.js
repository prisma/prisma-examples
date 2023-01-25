export const load = async ({ fetch }) => {
  const response = await fetch('/api/drafts')

  return { drafts: await response.json() }
}
