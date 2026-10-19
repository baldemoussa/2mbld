import { afterAll, afterEach, beforeAll } from 'vitest'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'test-jwt-secret-012345'
process.env.CLIENT_ORIGIN = 'http://localhost:5173'
process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/placeholder'
delete process.env.ADMIN_EMAIL
delete process.env.ADMIN_PASSWORD

let mongo: MongoMemoryServer

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  process.env.MONGODB_URI = mongo.getUri()
  await mongoose.connect(mongo.getUri())
})

afterEach(async () => {
  for (const collection of Object.values(mongoose.connection.collections)) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongoose.disconnect()
  if (mongo) await mongo.stop()
})
