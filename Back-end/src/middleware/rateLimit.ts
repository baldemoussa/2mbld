import rateLimit from 'express-rate-limit'

function limiter(limit: number) {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    limit,
    standardHeaders: true,
    legacyHeaders: false,
    skip: () => process.env.NODE_ENV === 'test',
    message: { error: { message: 'Too many requests. Please try again later.' } },
  })
}

export const contactLimiter = limiter(8)
export const loginLimiter = limiter(process.env.NODE_ENV === 'production' ? 5 : 30)
export const visitLimiter = limiter(30)
