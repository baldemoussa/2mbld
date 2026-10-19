import { ContactMessage } from '../models/ContactMessage.js'
import { toMessageDto } from './dto.js'

type ContactInput = {
  name: string
  email: string
  subject?: string
  message: string
  website?: string
}

type MessageQuery = {
  page: number
  limit: number
  status?: 'New' | 'Read' | 'Replied' | 'Archived'
}

export async function saveContactMessage(input: ContactInput): Promise<'stored' | 'ignored'> {
  if (input.website && input.website.trim()) {
    return 'ignored'
  }

  await ContactMessage.create({
    name: input.name,
    email: input.email,
    subject: input.subject || undefined,
    message: input.message,
    status: 'New',
  })
  return 'stored'
}

export async function listMessages(query: MessageQuery) {
  const filter = query.status ? { status: query.status } : {}
  const skip = (query.page - 1) * query.limit
  const [messages, total] = await Promise.all([
    ContactMessage.find(filter).sort({ createdAt: -1 }).skip(skip).limit(query.limit),
    ContactMessage.countDocuments(filter),
  ])

  return {
    messages: messages.map((message) => toMessageDto(message)),
    page: query.page,
    limit: query.limit,
    total,
  }
}

export async function getMessage(id: string) {
  const message = await ContactMessage.findById(id)
  return message ? toMessageDto(message) : null
}

export async function updateMessageStatus(
  id: string,
  status: 'New' | 'Read' | 'Replied' | 'Archived',
) {
  const message = await ContactMessage.findById(id)
  if (!message) return null
  message.status = status
  if (status === 'Replied' && !message.repliedAt) {
    message.repliedAt = new Date()
  }
  await message.save()
  return toMessageDto(message)
}
