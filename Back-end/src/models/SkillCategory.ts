import { Schema, model, type InferSchemaType } from 'mongoose'

const skillSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    icon: { type: String, trim: true, maxlength: 40 },
    sortOrder: { type: Number, default: 0 },
  },
  { _id: false },
)

const skillCategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]{3,60}$/, 'Slug must use lowercase letters, numbers, and hyphens.'],
    },
    description: { type: String, trim: true, maxlength: 300 },
    icon: { type: String, trim: true, maxlength: 40 },
    sortOrder: { type: Number, default: 0 },
    skills: { type: [skillSchema], default: [] },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true, strict: 'throw', collection: 'skillcategories' },
)

skillCategorySchema.index({ isPublished: 1, sortOrder: 1 })

export type SkillCategoryDocument = InferSchemaType<typeof skillCategorySchema>
export const SkillCategory = model('SkillCategory', skillCategorySchema)
