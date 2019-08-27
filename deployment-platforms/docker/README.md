# Prisma 2 and Docker

## Deployment

- `make build` && `make run`
- `open localhost:8080`
- Execute the following GraphQL query

```graphql
query {
  users {
    id
    name
    posts {
      id
      title
    }
  }
}
```

Note: Depending on how you set the database up (inside docker or on localhost or remote). Please ensure that docker container has access to the database. For accessing a localhost database from a docker container on mac, you can use the following host: `docker.for.mac.localhost`
