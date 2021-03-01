import createServer from './app'

const server = createServer({
  logger: {
    level: 'info',
  },
})

const start = async () => {
  try {
    const port = process.env.PORT ?? 3000
    await server.listen(port, '0.0.0.0')
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
