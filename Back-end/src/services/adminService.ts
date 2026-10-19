import { timingSafeEqual } from 'node:crypto'
import bcrypt from 'bcrypt'
import jwt, { type SignOptions } from 'jsonwebtoken'
import { getEnv } from '../config/env.js'

const TOKEN_TTL: SignOptions['expiresIn'] = '2h'
const DUMMY_HASH = bcrypt.hashSync('portfolio-dummy-password', 12)

let cachedHash: { email: string; password: string; hash: string } | null = null

async function passwordHash(email: string, password: string) {
  if (cachedHash?.email === email && cachedHash.password === password) return cachedHash.hash
  const hash = await bcrypt.hash(password, 12)
  cachedHash = { email, password, hash }
  return hash
}

function sameText(left: string, right: string) {
  const a = Buffer.from(left)
  const b = Buffer.from(right)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export async function authenticateAdmin(email: string, password: string) {
  const { adminEmail, adminPassword, jwtSecret } = getEnv()
  const configured = Boolean(adminEmail && adminPassword && adminPassword.length >= 8)
  const hash = configured ? await passwordHash(adminEmail!, adminPassword!) : DUMMY_HASH
  const passwordMatches = await bcrypt.compare(password, hash)
  const emailMatches = configured && sameText(email, adminEmail!)
  if (!configured || !emailMatches || !passwordMatches) return null

  const token = jwt.sign({ sub: adminEmail!, role: 'admin' }, jwtSecret, {
    expiresIn: TOKEN_TTL,
  })
  return { token, adminId: adminEmail! }
}

export function verifyAdminToken(token: string): { sub: string; role: string } | null {
  try {
    const payload = jwt.verify(token, getEnv().jwtSecret)
    if (typeof payload === 'string' || payload.role !== 'admin' || typeof payload.sub !== 'string') {
      return null
    }
    return { sub: payload.sub, role: payload.role }
  } catch {
    return null
  }
}
