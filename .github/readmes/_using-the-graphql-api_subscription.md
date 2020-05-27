## Using the GraphQL API

The schema that specifies the API operations of your GraphQL server is defined in [`./schema.graphql`](./schema.graphql). Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

### Call the subscription and watch for it in the GraphQL Playground

```graphql
subscription latestPost {
  latestPost {
    title
    content
  }
}
```

This will listen whenever you create a new draft as follows:

### Create a new draft

```graphql
mutation {
  createDraft(
    title: "Join the Prisma Slack"
    content: "https://slack.prisma.io"
    authorEmail: "alice@prisma.io"
  ) {
    id
    published
  }
}
```

Running the above mutation will automatically send the created data to the subscription!

### For viewing it best

- Keep two tabs of the GraphQL Playground open side by side.
- Run the subscription in one tab.
- Fire the mutation in the other tab and view results in the subscriptions tab in real-time!