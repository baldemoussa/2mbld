import 'dotenv/config'
import { createApp } from './app.js'
import { connectDb } from './config/db.js'
import { getEnv } from './config/env.js'

const { port } = getEnv()

try {
  await connectDb()
} catch (error) {
  const message = error instanceof Error ? `${error.name}: ${error.message}` : 'Unknown database connection error.'
  const safeMessage = message.replace(/(mongodb(?:\+srv)?:\/\/)[^@\s]+@/gi, '$1[REDACTED]@')
  console.error(`Database connection failed: ${safeMessage}`)
  process.exit(1)
}

const app = createApp()
app.listen(port, () => {
  console.log(`Portfolio API listening on port ${port}`)
})
