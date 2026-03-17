import 'dotenv/config'
import express from 'express'
import { postRouter } from './routes/post.routes'
import { userRouter } from './routes/user.routes'

const app = express()

app.use(express.json())
app.use(postRouter)
app.use(userRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () =>
  console.log(`Server ready at: http://localhost:${PORT}`),
)
