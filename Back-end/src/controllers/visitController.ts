import { randomBytes } from 'node:crypto'
import type { CookieOptions, NextFunction, Request, Response } from 'express'
import { getEnv } from '../config/env.js'
import { listMonthlyVisits, lookupPlace, saveVisit } from '../services/visitService.js'

const VISITOR_COOKIE = 'visitor_id'
const VISITOR_ID = /^[a-f0-9]{32}$/
const FOUR_HUNDRED_DAYS = 400 * 24 * 60 * 60 * 1000

function cookieOptions(): CookieOptions {
  const secure = getEnv().nodeEnv === 'production'
  return {
    httpOnly: true,
    secure,
    sameSite: secure ? 'none' : 'lax',
    path: '/',
    maxAge: FOUR_HUNDRED_DAYS,
  }
}

export async function recordVisit(req: Request, res: Response, next: NextFunction) {
  try {
    const current = req.cookies?.[VISITOR_COOKIE]
    const submitted = (req.body as { visitorId?: string }).visitorId
    const visitorId =
      typeof current === 'string' && VISITOR_ID.test(current)
        ? current
        : submitted && VISITOR_ID.test(submitted)
          ? submitted
          : randomBytes(16).toString('hex')
    const ip = (req.ip || req.socket.remoteAddress || '').replace(/^::ffff:/, '')
    await saveVisit(visitorId, await lookupPlace(ip))
    res.cookie(VISITOR_COOKIE, visitorId, cookieOptions())
    res.status(201).json({ recorded: true })
  } catch (error) {
    next(error)
  }
}

export async function getVisits(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json({ visits: await listMonthlyVisits() })
  } catch (error) {
    next(error)
  }
}
