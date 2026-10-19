import { Schema, model, type InferSchemaType } from 'mongoose'

const messageStatuses = ['New', 'Read', 'Replied', 'Archived'] as const

const contactMessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'A valid email is required.'],
    },
    subject: { type: String, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, minlength: 10, maxlength: 5000 },
    status: { type: String, enum: messageStatuses, default: 'New' },
    repliedAt: { type: Date },
  },
  { timestamps: true, strict: 'throw', collection: 'contactmessages' },
)

contactMessageSchema.index({ status: 1, createdAt: -1 })

export type ContactMessageDocument = InferSchemaType<typeof contactMessageSchema>
export const ContactMessage = model('ContactMessage', contactMessageSchema)
