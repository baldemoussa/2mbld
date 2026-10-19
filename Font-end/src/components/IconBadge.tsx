import {
  Code2,
  Database,
  Lightbulb,
  Server,
  Sparkles,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  database: Database,
  code: Code2,
  server: Server,
  wrench: Wrench,
  sparkles: Sparkles,
  lightbulb: Lightbulb,
}

const tones: Record<string, string> = {
  database: 'bg-rose-50 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300',
  code: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300',
  server: 'bg-sky-50 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300',
  wrench: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-400/15 dark:text-indigo-300',
  sparkles: 'bg-amber-50 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300',
  lightbulb: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-400/15 dark:text-yellow-200',
}

export function IconBadge({ name, className = 'h-5 w-5' }: { name?: string; className?: string }) {
  const Icon = (name && icons[name]) || Code2
  return (
    <span
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tones[name || ''] || 'bg-sky-50 text-accent dark:bg-sky-400/15'}`}
    >
      <Icon className={className} aria-hidden="true" />
    </span>
  )
}
