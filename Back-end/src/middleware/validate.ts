import type { NextFunction, Request, Response } from 'express'
import { ZodError, type ZodSchema } from 'zod'
import { HttpError } from '../http/errors.js'

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body)
    if (!parsed.success) {
      next(new HttpError(400, 'Check the submitted information and try again.', fieldErrors(parsed.error)))
      return
    }
    req.body = parsed.data
    next()
  }
}

export function validateQuery<T>(schema: ZodSchema<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.query)
    if (!parsed.success) {
      next(new HttpError(400, 'Check the query and try again.', fieldErrors(parsed.error)))
      return
    }
    resLocalsQuery(req, parsed.data)
    next()
  }
}

function fieldErrors(error: ZodError) {
  return error.flatten().fieldErrors
}

function resLocalsQuery(req: Request, data: unknown) {
  Object.assign(req, { validatedQuery: data })
}

export function readQuery<T>(req: Request): T {
  return (req as Request & { validatedQuery: T }).validatedQuery
}
