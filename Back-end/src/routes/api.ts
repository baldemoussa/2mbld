import { Router } from 'express'
import {
  getEducation,
  getExperiences,
  getProfile,
  getSkills,
  getVolunteer,
  getWorks,
} from '../controllers/contentController.js'
import { createContact } from '../controllers/contactController.js'
import { getVisits, recordVisit } from '../controllers/visitController.js'
import {
  getMessageById,
  getMessages,
  login,
  logout,
  patchMessage,
} from '../controllers/adminController.js'
import { requireAdmin, requireCsrf } from '../middleware/auth.js'
import { contactLimiter, loginLimiter, visitLimiter } from '../middleware/rateLimit.js'
import { validateBody, validateQuery } from '../middleware/validate.js'
import { contactSchema, loginSchema, messageQuerySchema, messageStatusSchema, visitSchema } from '../validators/schemas.js'

export const apiRouter = Router()

apiRouter.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

apiRouter.get('/profile', getProfile)
apiRouter.get('/skills', getSkills)
apiRouter.get('/experiences', getExperiences)
apiRouter.get('/education', getEducation)
apiRouter.get('/volunteer-experiences', getVolunteer)
apiRouter.get('/works', getWorks)
apiRouter.post('/contact', contactLimiter, validateBody(contactSchema), createContact)
apiRouter.post('/visits', visitLimiter, validateBody(visitSchema), recordVisit)

const admin = Router()
admin.post('/login', loginLimiter, validateBody(loginSchema), login)
admin.post('/logout', requireAdmin, requireCsrf, logout)
admin.get('/visits', requireAdmin, getVisits)
admin.get('/messages', requireAdmin, validateQuery(messageQuerySchema), getMessages)
admin.get('/messages/:id', requireAdmin, getMessageById)
admin.patch('/messages/:id', requireAdmin, requireCsrf, validateBody(messageStatusSchema), patchMessage)

apiRouter.use('/admin', admin)
