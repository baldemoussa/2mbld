import { Schema, model, type InferSchemaType } from 'mongoose'
import { limitedStrings } from './validators.js'

const volunteerSchema = new Schema(
  {
    organization: { type: String, required: true, trim: true, maxlength: 160 },
    role: { type: String, required: true, trim: true, maxlength: 160 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    isCurrent: { type: Boolean, default: false },
    description: { type: String, trim: true, maxlength: 500 },
    contributions: {
      type: [String],
      default: [],
      validate: limitedStrings(8, 400),
    },
    sortOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true, strict: 'throw', collection: 'volunteerexperiences' },
)

volunteerSchema.pre('validate', function () {
  if (this.isCurrent && this.endDate) {
    this.invalidate('endDate', 'endDate must be null when isCurrent is true.')
  }
  if (this.endDate && this.startDate && this.endDate < this.startDate) {
    this.invalidate('endDate', 'endDate must not precede startDate.')
  }
})

volunteerSchema.index({ isPublished: 1, sortOrder: 1, startDate: -1 })

export type VolunteerDocument = InferSchemaType<typeof volunteerSchema>
export const VolunteerExperience = model('VolunteerExperience', volunteerSchema)
