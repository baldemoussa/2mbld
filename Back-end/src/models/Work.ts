import { Schema, model, type InferSchemaType } from 'mongoose'
import { isAssetUrl, isHttpUrl, limitedStrings } from './validators.js'

const workSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]{3,80}$/, 'Slug must use lowercase letters, numbers, and hyphens.'],
    },
    summary: { type: String, required: true, trim: true, maxlength: 400 },
    repositoryUrl: {
      type: String,
      required: true,
      trim: true,
      validate: { validator: isHttpUrl, message: 'repositoryUrl must be an http(s) URL.' },
    },
    liveUrl: {
      type: String,
      trim: true,
      validate: { validator: isHttpUrl, message: 'liveUrl must be an http(s) URL.' },
    },
    imageUrl: {
      type: String,
      trim: true,
      validate: {
        validator: isAssetUrl,
        message: 'imageUrl must be an http(s) URL or a site path such as /images/works/pro-tasker.png.',
      },
    },
    technologies: {
      type: [String],
      default: [],
      validate: limitedStrings(12, 40),
    },
    highlights: {
      type: [String],
      default: [],
      validate: limitedStrings(6, 240),
    },
    sortOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true, strict: 'throw', collection: 'works' },
)

workSchema.index({ isPublished: 1, sortOrder: 1 })

export type WorkDocument = InferSchemaType<typeof workSchema>
export const Work = model('Work', workSchema)
