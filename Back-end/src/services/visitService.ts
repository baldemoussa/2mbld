import { Visit } from '../models/Visit.js'

export type VisitLocation = {
  country: string
  city: string
  count: number
}

export type MonthlyVisit = {
  month: string
  count: number
  locations: VisitLocation[]
}

export type VisitPlace = {
  country: string
  city: string
}

export function currentMonth(date = new Date()) {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

function isDuplicate(error: unknown) {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 11000
}

function placeName(value: unknown) {
  if (typeof value !== 'string') return ''
  const cleaned = value.trim().replace(/\s+/g, ' ')
  if (!cleaned || cleaned.length > 80) return ''
  if (!/^[\p{L}\p{M}\p{N} .,'()-]+$/u.test(cleaned)) return ''
  return cleaned
}

export function isPublicIp(ip: string) {
  const value = ip.trim().toLowerCase().replace(/^::ffff:/, '')
  if (!value || value === '::1' || value === '0.0.0.0') return false
  if (value.includes('.')) {
    const parts = value.split('.').map(Number)
    if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return false
    const [first, second] = parts
    if (first === 10 || first === 127 || first === 0) return false
    if (first === 169 && second === 254) return false
    if (first === 172 && second >= 16 && second <= 31) return false
    if (first === 192 && second === 168) return false
    if (first === 100 && second >= 64 && second <= 127) return false
    return true
  }
  if (value.startsWith('fc') || value.startsWith('fd') || value.startsWith('fe80')) return false
  return value.includes(':')
}

export async function lookupPlace(ip: string): Promise<VisitPlace> {
  const empty = { country: '', city: '' }
  if (process.env.NODE_ENV === 'test' || !isPublicIp(ip)) return empty

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 2500)
  try {
    const response = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, { signal: controller.signal })
    if (!response.ok) return empty
    const body = (await response.json()) as { success?: boolean; country?: unknown; city?: unknown }
    if (!body.success) return empty
    return { country: placeName(body.country), city: placeName(body.city) }
  } catch {
    return empty
  } finally {
    clearTimeout(timer)
  }
}

export async function saveVisit(visitorId: string, place: Partial<VisitPlace> = {}, month = currentMonth()) {
  const country = placeName(place.country)
  const city = placeName(place.city)
  try {
    await Visit.updateOne(
      { visitorId, month },
      { $setOnInsert: { visitorId, month, country, city } },
      { upsert: true },
    )
  } catch (error) {
    if (isDuplicate(error)) return
    throw error
  }
}

function sortLocations(locations: VisitLocation[]) {
  return [...locations].sort((left, right) => {
    if (right.count !== left.count) return right.count - left.count
    const leftKnown = left.country || left.city ? 0 : 1
    const rightKnown = right.country || right.city ? 0 : 1
    if (leftKnown !== rightKnown) return leftKnown - rightKnown
    return `${left.country} ${left.city}`.localeCompare(`${right.country} ${right.city}`)
  })
}

export async function listMonthlyVisits(): Promise<MonthlyVisit[]> {
  const rows = await Visit.aggregate<{ _id: { month: string; country: string; city: string }; count: number }>([
    {
      $group: {
        _id: {
          month: '$month',
          country: { $ifNull: ['$country', ''] },
          city: { $ifNull: ['$city', ''] },
        },
        count: { $sum: 1 },
      },
    },
  ])

  const byMonth = new Map<string, MonthlyVisit>()
  for (const row of rows) {
    const current = byMonth.get(row._id.month) ?? { month: row._id.month, count: 0, locations: [] }
    current.count += row.count
    current.locations.push({ country: row._id.country, city: row._id.city, count: row.count })
    byMonth.set(row._id.month, current)
  }

  return [...byMonth.values()]
    .sort((left, right) => right.month.localeCompare(left.month))
    .map((month) => ({ ...month, locations: sortLocations(month.locations) }))
}
