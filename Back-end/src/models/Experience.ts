import { Schema, model, type InferSchemaType } from 'mongoose'
import { limitedStrings } from './validators.js'

const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Volunteer', 'Other'] as const

const experienceSchema = new Schema(
  {
    company: { type: String, required: true, trim: true, maxlength: 120 },
    position: { type: String, required: true, trim: true, maxlength: 160 },
    location: { type: String, trim: true, maxlength: 120 },
    employmentType: { type: String, enum: employmentTypes, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    isCurrent: { type: Boolean, default: false },
    summary: { type: String, trim: true, maxlength: 500 },
    responsibilities: {
      type: [String],
      default: [],
      validate: limitedStrings(12, 400),
    },
    achievements: {
      type: [String],
      default: [],
      validate: limitedStrings(8, 400),
    },
    technologies: {
      type: [String],
      default: [],
      validate: limitedStrings(20, 80),
    },
    sortOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true, strict: 'throw', collection: 'experiences' },
)

experienceSchema.pre('validate', function () {
  if (this.isCurrent && this.endDate) {
    this.invalidate('endDate', 'endDate must be null when isCurrent is true.')
  }
  if (this.endDate && this.startDate && this.endDate < this.startDate) {
    this.invalidate('endDate', 'endDate must not precede startDate.')
  }
})

experienceSchema.index({ isPublished: 1, sortOrder: 1, startDate: -1 })

export type ExperienceDocument = InferSchemaType<typeof experienceSchema>
export const Experience = model('Experience', experienceSchema)
