import { randomBytes } from 'node:crypto'
import type { CookieOptions, NextFunction, Request, Response } from 'express'
import { getEnv } from '../config/env.js'
import { HttpError } from '../http/errors.js'
import { verifyAdminToken } from '../services/adminService.js'

const SESSION_COOKIE = 'admin_token'
const CSRF_COOKIE = 'csrf_token'
const TWO_HOURS = 2 * 60 * 60 * 1000

function cookieOptions(): CookieOptions {
  const { nodeEnv } = getEnv()
  const secure = nodeEnv === 'production'
  return {
    secure,
    sameSite: secure ? 'none' : 'lax',
    path: '/',
    maxAge: TWO_HOURS,
  }
}

export function setAuthCookies(res: Response, token: string): string {
  const csrf = randomBytes(24).toString('hex')
  const options = cookieOptions()
  res.cookie(SESSION_COOKIE, token, { ...options, httpOnly: true })
  res.cookie(CSRF_COOKIE, csrf, { ...options, httpOnly: false })
  return csrf
}

export function clearAuthCookies(res: Response) {
  const options = cookieOptions()
  res.clearCookie(SESSION_COOKIE, { ...options, httpOnly: true })
  res.clearCookie(CSRF_COOKIE, { ...options, httpOnly: false })
}

export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies?.[SESSION_COOKIE]
  const payload = typeof token === 'string' ? verifyAdminToken(token) : null
  if (!payload) {
    next(new HttpError(401, 'Authentication required.'))
    return
  }
  req.adminId = payload.sub
  next()
}

export function requireCsrf(req: Request, _res: Response, next: NextFunction) {
  const cookie = req.cookies?.[CSRF_COOKIE]
  const header = req.get('x-csrf-token')
  if (!cookie || !header || cookie !== header) {
    next(new HttpError(403, 'Invalid CSRF token.'))
    return
  }
  next()
}
