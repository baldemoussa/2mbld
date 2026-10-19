import type { ReactNode } from 'react'

export function SectionHeading({
  icon,
  title,
  id,
  compact = false,
}: {
  icon: ReactNode
  title: string
  id?: string
  compact?: boolean
}) {
  return (
    <div className="mb-6 flex items-start gap-3 sm:items-center">
      <span className="mt-1 shrink-0 text-accent sm:mt-0">{icon}</span>
      <h2 id={id} className={`min-w-0 font-bold text-navy ${compact ? 'text-xl leading-snug' : 'text-2xl leading-tight'}`}>
        {title}
      </h2>
    </div>
  )
}
