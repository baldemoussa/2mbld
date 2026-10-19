import type { NextFunction, Request, Response } from 'express'
import { HttpError } from '../http/errors.js'
import { clearAuthCookies, setAuthCookies } from '../middleware/auth.js'
import { readQuery } from '../middleware/validate.js'
import { authenticateAdmin } from '../services/adminService.js'
import { getMessage, listMessages, updateMessageStatus } from '../services/contactService.js'
import { objectIdSchema } from '../validators/schemas.js'

type MessageQuery = {
  page: number
  limit: number
  status?: 'New' | 'Read' | 'Replied' | 'Archived'
}

type MessageStatusBody = {
  status: 'New' | 'Read' | 'Replied' | 'Archived'
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body as { email: string; password: string }
    const session = await authenticateAdmin(email, password)
    if (!session) {
      next(new HttpError(401, 'Invalid email or password.'))
      return
    }
    setAuthCookies(res, session.token)
    res.json({ message: 'Signed in.' })
  } catch (error) {
    next(error)
  }
}

export function logout(_req: Request, res: Response) {
  clearAuthCookies(res)
  res.json({ message: 'Signed out.' })
}

export async function getMessages(req: Request, res: Response, next: NextFunction) {
  try {
    const query = readQuery<MessageQuery>(req)
    res.json(await listMessages(query))
  } catch (error) {
    next(error)
  }
}

export async function getMessageById(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = objectIdSchema.safeParse(req.params.id)
    if (!parsed.success) {
      next(new HttpError(400, 'Invalid id.'))
      return
    }
    const message = await getMessage(parsed.data)
    if (!message) {
      next(new HttpError(404, 'Message not found.'))
      return
    }
    res.json({ message })
  } catch (error) {
    next(error)
  }
}

export async function patchMessage(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = objectIdSchema.safeParse(req.params.id)
    if (!parsed.success) {
      next(new HttpError(400, 'Invalid id.'))
      return
    }
    const body = req.body as MessageStatusBody
    const message = await updateMessageStatus(parsed.data, body.status)
    if (!message) {
      next(new HttpError(404, 'Message not found.'))
      return
    }
    res.json({ message })
  } catch (error) {
    next(error)
  }
}
