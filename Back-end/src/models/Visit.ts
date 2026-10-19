import { Schema, model, type InferSchemaType } from 'mongoose'

const visitSchema = new Schema(
  {
    visitorId: {
      type: String,
      required: true,
      match: [/^[a-f0-9]{32}$/, 'visitorId must be 32 hex characters.'],
    },
    month: {
      type: String,
      required: true,
      match: [/^\d{4}-(0[1-9]|1[0-2])$/, 'month must be YYYY-MM.'],
    },
    country: { type: String, trim: true, maxlength: 80, default: '' },
    city: { type: String, trim: true, maxlength: 80, default: '' },
  },
  { timestamps: true, strict: 'throw', collection: 'visits' },
)

visitSchema.index({ visitorId: 1, month: 1 }, { unique: true })

export type VisitDocument = InferSchemaType<typeof visitSchema>
export const Visit = model('Visit', visitSchema)
