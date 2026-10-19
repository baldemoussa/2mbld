import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { getEnv } from './config/env.js'
import { apiRouter } from './routes/api.js'
import { errorHandler } from './middleware/errorHandler.js'

export function createApp() {
  const { clientOrigin } = getEnv()
  const app = express()

  app.disable('x-powered-by')
  app.set('trust proxy', 1)
  app.use(helmet())
  app.use(
    cors({
      origin: clientOrigin,
      credentials: true,
    }),
  )
  app.use(express.json({ limit: '32kb' }))
  app.use(cookieParser())
  app.use('/api/v1', apiRouter)
  app.use((_req, res) => {
    res.status(404).json({ error: { message: 'Not found.' } })
  })
  app.use(errorHandler)

  return app
}
