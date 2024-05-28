export const environmentVariables = {
  // **IMPORTANT**: Use a [search-only API key](https://typesense.org/docs/0.20.0/api/api-keys.html#create-an-api-key) for Typesense.
  TYPESENSE_API_KEY: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_API_KEY!,
  TYPESENSE_HOST: process.env.NEXT_PUBLIC_TYPESENSE_HOST!,
  TYPESENSE_PORT: 443,
  TYPESENSE_PROTOCOL: 'https',
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
}
