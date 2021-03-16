## Using the GraphQL API

The schema that specifies the API operations of your GraphQL server is defined in [`./schema.graphql`](./schema.graphql). Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

### Subscribe to new posts being created

Subscriptions work a bit differently in GraphQL Playgrounds compared to queries and mutations. Queries and mutations immediately show the result on the right side of the Playground – subscription results on the other hand will only be shown once a subscription is triggered. Here is an example for the `newPost` subscription:

```graphql
subscription {
  newPost {
    id
    title
    published
    author {
      id
      email
      name
    }
  }
}
```

Once you submit this subscription, the GraphQL Playground will enter a "waiting" state:

![](https://imgur.com/p1k1vk2.png)

As soon as the subscription is [triggered](./src/schema.ts#l117) (via the`createDraft` mutation), the right side of the GraphQL Playground data will show the data of the newly created draft.

### Create a new draft

To properly observe the subscription result, it's best to open two GraphQL Playground windows side-by-side and run the mutation in the second one. However, you _can_ also just run the subscription and mutation in different tabs, only in this case you won't be able to see the subscription data pop up in "realtime" (since you only see it when you navigate back to the tab with the "waiting" subscription). 

```graphql
mutation {
  createDraft(
    data: { title: "Join the Prisma Slack", content: "https://slack.prisma.io" }
    authorEmail: "alice@prisma.io"
  ) {
    id
    author {
      id
      name
    }
  }
}
```

Here's what it looks like when switching tabs:

![](https://i.imgur.com/GJdHAKg.gif)


<details><summary><strong>See more API operations</strong></summary>


### Subscribe to the publishing of drafts

```graphql
subscription {
  postPublished {
    id
    title
    published
    author {
      id
      name
      email
    }
  }
}
```

### Publish/unpublish an existing post

```graphql
mutation {
  togglePublishPost(id: __POST_ID__) {
    id
    published
  }
}
```

Note that you need to replace the `__POST_ID__` placeholder with an actual `id` from a `Post` record in the database, e.g.`5`:

```graphql
mutation {
  togglePublishPost(id: 5) {
    id
    published
  }
}
```

The subscription will only be fired if the `published` field is updated from `false` to `true`, but not the other way around. This logic is implemented in the resolver of the `togglePublishPost` mutation [here](./src/schema.ts#l135). 

</details>