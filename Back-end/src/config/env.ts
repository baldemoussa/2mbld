export type AppEnv = {
  nodeEnv: string
  port: number
  mongoUri: string
  clientOrigin: string
  jwtSecret: string
  adminEmail?: string
  adminPassword?: string
}

function required(name: string, value: string | undefined): string {
  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value.trim()
}

export function getEnv(): AppEnv {
  const mongoUri = process.env.MONGODB_URI?.trim() || process.env.MONGO_URI?.trim()
  const jwtSecret = required('JWT_SECRET', process.env.JWT_SECRET)
  if (jwtSecret.length < 16) {
    throw new Error('JWT_SECRET must be at least 16 characters.')
  }

  return {
    nodeEnv: process.env.NODE_ENV?.trim() || 'development',
    port: Number(process.env.PORT) || 3001,
    mongoUri: required('MONGODB_URI', mongoUri),
    clientOrigin: process.env.CLIENT_ORIGIN?.trim() || 'http://localhost:5173',
    jwtSecret,
    adminEmail: process.env.ADMIN_EMAIL?.trim().toLowerCase() || undefined,
    adminPassword: process.env.ADMIN_PASSWORD || undefined,
  }
}
