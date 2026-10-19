import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express, { type NextFunction, type Request, type Response } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { getEnv } from './config/env.js'
import { apiRouter } from './routes/api.js'
import { errorHandler } from './middleware/errorHandler.js'

const frontendDist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../Font-end/dist')

export function createApp() {
  const { clientOrigin, nodeEnv } = getEnv()
  const app = express()

  app.disable('x-powered-by')
  app.set('trust proxy', 1)
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          imgSrc: ["'self'", 'data:'],
          connectSrc: ["'self'"],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          formAction: ["'self'"],
          frameAncestors: ["'self'"],
          upgradeInsecureRequests: [],
        },
      },
    }),
  )
  app.use(
    cors({
      origin: clientOrigin,
      credentials: true,
    }),
  )
  app.use(express.json({ limit: '32kb' }))
  app.use(cookieParser())
  app.use('/api/v1', apiRouter)

  if (nodeEnv === 'production') {
    app.use(express.static(frontendDist))
    app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        next()
        return
      }
      if (req.path.startsWith('/api')) {
        next()
        return
      }
      res.sendFile(path.join(frontendDist, 'index.html'), (error) => {
        if (error) next()
      })
    })
  }

  app.use((_req, res) => {
    res.status(404).json({ error: { message: 'Not found.' } })
  })
  app.use(errorHandler)

  return app
}
