const { createYoga } = require("graphql-yoga")
const { createServer } = require("http")
const { schema } = require('./schema')
const { context } = require('./context')


const yoga = createYoga({
  graphqlEndpoint: '/',
  schema: schema,
  context
})
const server = createServer(yoga)

server.listen(4000, () => {
  console.log(`
  🚀 Server ready at: http://localhost:4000
  ⭐️ See sample queries: http://pris.ly/e/js/graphql-sdl-first#using-the-graphql-api`)
})
