import type { NextFunction, Request, Response } from 'express'
import { HttpError } from '../http/errors.js'

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof HttpError) {
    res.status(error.status).json({
      error: {
        message: error.message,
        ...(error.details ? { details: error.details } : {}),
      },
    })
    return
  }

  const name = error instanceof Error ? error.name : 'Error'
  console.error(`Request failed: ${name}`)
  res.status(500).json({ error: { message: 'Something went wrong.' } })
}
