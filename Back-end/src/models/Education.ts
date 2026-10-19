import { Schema, model, type InferSchemaType } from 'mongoose'

const educationStatuses = ['Completed', 'In Progress', 'Planned', 'Not Specified'] as const

const educationSchema = new Schema(
  {
    institution: { type: String, required: true, trim: true, maxlength: 160 },
    qualification: { type: String, required: true, trim: true, maxlength: 160 },
    fieldOfStudy: { type: String, trim: true, maxlength: 120 },
    location: { type: String, trim: true, maxlength: 120 },
    startDate: { type: Date },
    endDate: { type: Date },
    status: { type: String, enum: educationStatuses, default: 'Not Specified' },
    description: { type: String, trim: true, maxlength: 500 },
    sortOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true, strict: 'throw', collection: 'educations' },
)

educationSchema.pre('validate', function () {
  if (this.startDate && this.endDate && this.endDate < this.startDate) {
    this.invalidate('endDate', 'endDate must not precede startDate.')
  }
})

educationSchema.index({ isPublished: 1, sortOrder: 1 })

export type EducationDocument = InferSchemaType<typeof educationSchema>
export const Education = model('Education', educationSchema)
