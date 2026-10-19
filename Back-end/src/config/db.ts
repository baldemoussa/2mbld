import mongoose from 'mongoose'
import { getEnv } from './env.js'

export async function connectDb(): Promise<void> {
  const { mongoUri } = getEnv()
  mongoose.set('strictQuery', true)
  await mongoose.connect(mongoUri)
}

export async function disconnectDb(): Promise<void> {
  await mongoose.disconnect()
}
