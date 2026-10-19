import 'dotenv/config'
import { createApp } from './app.js'
import { connectDb } from './config/db.js'
import { getEnv } from './config/env.js'

const { port } = getEnv()

try {
  await connectDb()
} catch {
  console.error('Database connection failed. Check MONGODB_URI and try again.')
  process.exit(1)
}

const app = createApp()
app.listen(port, () => {
  console.log(`Portfolio API listening on port ${port}`)
})
