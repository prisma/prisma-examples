# GraphQL Server Example

This example shows how to implement a **GraphQL server with TypeScript** with the following stack:

- **Apollo Server**: HTTP server for GraphQL APIs   
- **GraphQL Nexus**: GraphQL schema definition and resolver implementation 
- **Prisma Client**: Databases access (ORM)                  
- **Prisma Migrate**: Database migrations               
- **SQLite**: Local, file-based SQL database          

__INLINE(../_setup-0.md)__
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/typescript/graphql
__INLINE(../_setup-1.md)__
cd graphql
__INLINE(../_setup-2.md)__
cd prisma-examples/typescript/graphql
__INLINE(../_setup-3-new.md)__

__INLINE(../_start-graphql-server.md)__

__INLINE(../../_using-the-graphql-api-new.md)__

__INLINE(../_evolving-the-app-graphql-new.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../_next-steps.md)__
