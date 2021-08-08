import { asNexusMethod, makeSchema } from "nexus"
import { join } from "path"
import { DateTimeResolver } from "graphql-scalars"
import { applyMiddleware } from "graphql-middleware"

import * as resolvers from "./resolvers"
import * as types from "./types"
import permissions from "./permissions"

const GQLDate = asNexusMethod(DateTimeResolver, "date")

const schema = makeSchema({
  types: [resolvers, types, GQLDate],
  contextType: {
    module: join(process.cwd(), "graphql", "context.ts"),
    export: "Context",
  },
  outputs: {
    typegen: join(process.cwd(), "generated/nexus-typegen.ts"),
    schema: join(process.cwd(), "generated/schema.graphql"),
  },
})

export default applyMiddleware(schema, permissions)
