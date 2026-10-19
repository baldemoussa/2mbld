import type { NextFunction, Request, Response } from 'express'
import { HttpError } from '../http/errors.js'
import { saveContactMessage } from '../services/contactService.js'

type ContactBody = {
  name: string
  email: string
  subject?: string
  message: string
  website?: string
}

export async function createContact(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body as ContactBody
    await saveContactMessage(body)
    res.status(201).json({ message: 'Your message has been received.' })
  } catch (error) {
    next(error instanceof Error ? error : new HttpError(500, 'Something went wrong.'))
  }
}
