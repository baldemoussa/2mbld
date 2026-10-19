import 'dotenv/config'
import { connectDb, disconnectDb } from '../config/db.js'
import { seedPortfolio } from './portfolio.js'

try {
  await connectDb()
  await seedPortfolio()
} catch (error) {
  const name = error instanceof Error ? error.name : 'Error'
  console.error(`Seed failed: ${name}`)
  process.exitCode = 1
} finally {
  await disconnectDb()
}
