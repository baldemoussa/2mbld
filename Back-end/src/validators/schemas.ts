import { z } from 'zod'

export const visitSchema = z.preprocess(
  (value) => value ?? {},
  z
    .object({
      visitorId: z
        .string()
        .regex(/^[a-f0-9]{32}$/)
        .optional(),
    })
    .strict(),
)

export const contactSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().toLowerCase().email().max(254),
    subject: z.string().trim().max(200).optional(),
    message: z.string().trim().min(10).max(5000),
    website: z.string().max(200).optional(),
  })
  .strict()

export const loginSchema = z
  .object({
    email: z.string().trim().toLowerCase().email().max(254),
    password: z.string().min(8).max(72),
  })
  .strict()

export const messageStatusSchema = z
  .object({
    status: z.enum(['New', 'Read', 'Replied', 'Archived']),
  })
  .strict()

export const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid id.')

export const messageQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  status: z.enum(['New', 'Read', 'Replied', 'Archived']).optional(),
})
