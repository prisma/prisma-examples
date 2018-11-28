# GraphQL Server Example

This example shows how to implement a **GraphQL server with Golang** based on Prisma & [gqlgen](https://github.com/99designs/gqlgen).

__INLINE(../_setup-1.md)__
cd prisma-examples/go/graphql
__INLINE(../_setup-2.md)__

### 4. Start the GraphQL server

```
go run ./server
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).

### 5. Changing the GraphQL schema

After you made changes to `schema.grapql`, you need to invoke to update the generated types in `./server/generated.go` and potentially also adjust the resolver implementations in `./server/resolver.go`:

```
go run sripts/gqlgen.go
```

This updates `./server/generated.go` to incorporate the schema changes in your Go type definitions. It also generates scaffolded resolvers in `tmp/resolver.go` that you might need to copy and paste into `./server/resolver.go`. 