import type {
  ContactMessage,
  Education,
  Experience,
  MonthlyVisit,
  Profile,
  SkillCategory,
  VolunteerExperience,
  Work,
} from '../types/index.ts'

const base = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? ''

export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

function csrfToken() {
  const row = document.cookie.split('; ').find((part) => part.startsWith('csrf_token='))
  return row ? decodeURIComponent(row.slice('csrf_token='.length)) : ''
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers)
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  const csrf = csrfToken()
  if (csrf && options.method && options.method !== 'GET') {
    headers.set('X-CSRF-Token', csrf)
  }

  const response = await fetch(`${base}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  })

  const payload = (await response.json().catch(() => null)) as {
    error?: { message?: string }
  } | null

  if (!response.ok) {
    throw new ApiError(response.status, payload?.error?.message || 'Request failed.')
  }

  return payload as T
}

export async function getProfile() {
  try {
    const data = await request<{ profile: Profile }>('/api/v1/profile')
    return data.profile
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null
    throw error
  }
}

export function getSkills() {
  return request<{ skills: SkillCategory[] }>('/api/v1/skills').then((data) => data.skills)
}

export function getExperiences() {
  return request<{ experiences: Experience[] }>('/api/v1/experiences').then((data) => data.experiences)
}

export function getEducation() {
  return request<{ education: Education[] }>('/api/v1/education').then((data) => data.education)
}

export function getWorks() {
  return request<{ works: Work[] }>('/api/v1/works').then((data) => data.works)
}

export function getVolunteer() {
  return request<{ volunteerExperiences: VolunteerExperience[] }>('/api/v1/volunteer-experiences').then(
    (data) => data.volunteerExperiences,
  )
}

const visitorKey = 'portfolio-visitor'

function browserVisitorId() {
  const saved = localStorage.getItem(visitorKey)
  if (saved && /^[a-f0-9]{32}$/.test(saved)) return saved
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  const id = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
  localStorage.setItem(visitorKey, id)
  return id
}

export function recordVisit() {
  return request<{ recorded: boolean }>('/api/v1/visits', {
    method: 'POST',
    body: JSON.stringify({ visitorId: browserVisitorId() }),
  })
}

export function getVisits() {
  return request<{ visits: MonthlyVisit[] }>('/api/v1/admin/visits')
}

export function sendContact(input: { name: string; email: string; message: string; website?: string }) {
  return request<{ message: string }>('/api/v1/contact', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export function adminLogin(email: string, password: string) {
  return request<{ message: string }>('/api/v1/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function adminLogout() {
  return request<{ message: string }>('/api/v1/admin/logout', { method: 'POST' })
}

export function getMessages(page = 1) {
  return request<{ messages: ContactMessage[]; page: number; limit: number; total: number }>(
    `/api/v1/admin/messages?page=${page}`,
  )
}

export function updateMessageStatus(id: string, status: ContactMessage['status']) {
  return request<{ message: ContactMessage }>(`/api/v1/admin/messages/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
}
