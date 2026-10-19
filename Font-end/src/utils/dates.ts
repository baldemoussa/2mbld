export function monthYear(value?: string | null) {
  if (!value) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value))
}

export function dateRange(start?: string | null, end?: string | null, current = false) {
  const from = monthYear(start)
  if (current) return from ? `${from} – Present` : 'Present'
  const to = monthYear(end)
  if (from && to) return `${from} – ${to}`
  return from || to
}
