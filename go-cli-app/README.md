### Introduction

Exploration around resolvers type generation in go and some sort of bindings.

### Setup

1. Clone the project at a [GOPATH](https://github.com/golang/go/wiki/GOPATH)
1. Run `go get ./...` (to install all deps)
1. Run `go run main.go list 10`

### Commands

1. `count`
1. `list <first>`
1. `search <query>`
1. `create <text>` (no spaces)
1. `delete <id>`
1. `get <id>`


### Application Structure

1. `db` folder contain a hand-written Prisma service definition. Deploy it locally. 

1. `orm` folder contains a generated (Prisma client via `prisma generate`).

### Building Prisma

1. Go generator is in `generateGo` branch.
1. Checkout the branch.
1. cd `prisma-lib` and `yarn build` and `yarn link`.
1. cd `../cli/packages/prisma-cli-core` and `yarn build` and `yarn link prisma-lib`.
1. Alias `lprisma` to `cli/packages/prisma-cli/dist/index.js` or use it direcly.
1. `lprisma generate` - profit

### Use Pre-Build Prisma CLI with Go Generator

##### Via Brew

1. `brew tap prisma/prisma`
1. `brew install prisma`

##### Via npm

1. `npm install -g prisma`

### Useful Packages/Resources

##### GraphQL Server

* https://gqlgen.com/getting-started/

##### GraphQL Client

* https://blog.machinebox.io/a-graphql-client-library-for-go-5bffd0455878

* https://github.com/machinebox/graphql

* https://github.com/shurcooL/graphql