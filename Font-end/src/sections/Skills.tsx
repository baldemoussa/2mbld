import { Layers } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading.tsx'
import { SkillGroup } from '../components/SkillGroup.tsx'
import type { SkillCategory } from '../types/index.ts'

export function Skills({ categories, status }: { categories: SkillCategory[]; status: 'loading' | 'ready' | 'error' }) {
  return (
    <section id="skills" className="scroll-mt-24 bg-paper" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionHeading
          id="skills-heading"
          title="Technology Stack"
          icon={<Layers className="h-7 w-7" aria-hidden="true" />}
        />
        {status === 'loading' ? <p role="status" className="text-sm text-muted">Loading skills…</p> : null}
        {status === 'error' ? <p role="alert" className="text-sm text-rose-700 dark:text-rose-300">Skills could not be loaded.</p> : null}
        {status === 'ready' && categories.length === 0 ? (
          <p className="text-sm text-muted">No published skills are available yet.</p>
        ) : null}
        {status === 'ready' && categories.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {categories.map((category) => (
              <SkillGroup key={category.slug} category={category} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
