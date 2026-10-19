import { Schema, model, type InferSchemaType } from 'mongoose'
import { isAssetUrl, isHttpUrl } from './validators.js'

const profileSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 120 },
    headline: { type: String, required: true, trim: true, maxlength: 180 },
    tagline: {
      type: String,
      trim: true,
      maxlength: 120,
      default: 'Better Code, Better Solutions.',
    },
    summary: { type: String, required: true, trim: true, maxlength: 2000 },
    location: {
      type: String,
      trim: true,
      maxlength: 120,
      default: 'Philadelphia, Pennsylvania',
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'A valid email is required.'],
    },
    portraitUrl: {
      type: String,
      trim: true,
      validate: {
        validator: isAssetUrl,
        message: 'portraitUrl must be an http(s) URL or a site path such as /images/profile.jpg.',
      },
    },
    resumeUrl: {
      type: String,
      trim: true,
      validate: {
        validator: isAssetUrl,
        message: 'resumeUrl must be an http(s) URL or a site path such as /documents/resume.pdf.',
      },
    },
    socialLinks: {
      linkedin: {
        type: String,
        trim: true,
        validate: { validator: isHttpUrl, message: 'LinkedIn must be an http(s) URL.' },
      },
      github: {
        type: String,
        trim: true,
        validate: { validator: isHttpUrl, message: 'GitHub must be an http(s) URL.' },
      },
    },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true, strict: 'throw', collection: 'profiles' },
)

export type ProfileDocument = InferSchemaType<typeof profileSchema> & { _id: unknown }
export const Profile = model('Profile', profileSchema)
