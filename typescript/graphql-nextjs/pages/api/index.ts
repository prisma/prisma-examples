import { ApolloServer } from "apollo-server-micro"
import { NextApiHandler } from "next"

import schema from "../../graphql/schema"
import { createContext } from "../../graphql/context"

export const config = {
  api: {
    bodyParser: false,
  },
}

const apolloServer = new ApolloServer({ schema, context: createContext })

const startServer = apolloServer.start()

const handler: NextApiHandler = async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  )
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  if (req.method === "OPTIONS") {
    res.end()
    return
  }

  await startServer
  await apolloServer.createHandler({
    path: "/api",
  })(req, res)
}
export default handler
