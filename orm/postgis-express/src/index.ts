import { app } from './server'
const PORT = 3000

app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`),
)
