import type { SkillCategory } from '../types/index.ts'
import { IconBadge } from './IconBadge.tsx'
import { TechIcon } from './TechIcon.tsx'

export function SkillGroup({ category }: { category: SkillCategory }) {
  return (
    <article className="rounded-2xl border border-line bg-surface p-6 shadow-card">
      <div className="mb-4 flex items-start gap-3">
        <IconBadge name={category.icon} />
        <h3 className="min-w-0 text-lg font-semibold leading-snug text-navy">{category.name}</h3>
      </div>
      {category.description ? <p className="mb-3 text-sm text-muted">{category.description}</p> : null}
      <ul className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <li
            key={skill.name}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 py-1 text-xs font-medium text-ink"
          >
            <TechIcon name={skill.name} className="h-4 w-4" />
            {skill.name}
          </li>
        ))}
      </ul>
    </article>
  )
}
