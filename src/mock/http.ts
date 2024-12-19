import cors from 'cors'
import express from 'express'
import { createMiddleware } from '@mswjs/http-middleware'
import { handlers } from './handlers'

const app = express()
const port = 9090

app.use(
  cors({
    origin: 'http://localhost:3000',

    optionsSuccessStatus: 200,
    credentials: true,
  }),
)
app.use(express.json())
app.use(createMiddleware(...handlers))
app.listen(port, () => console.log(`목서버가 ${port}포트에서 실행중....`))
