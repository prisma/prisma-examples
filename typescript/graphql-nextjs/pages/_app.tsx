import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import type { AppProps } from "next/app"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "/api",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
