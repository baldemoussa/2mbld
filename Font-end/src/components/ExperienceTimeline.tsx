import type { Experience } from '../types/index.ts'
import { dateRange } from '../utils/dates.ts'

export function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  if (experiences.length === 0) {
    return <p className="text-sm text-muted">No published experience is available yet.</p>
  }

  return (
    <ol className="space-y-8 border-l border-line pl-6">
      {experiences.map((job) => (
        <li key={`${job.company}-${job.position}`} className="relative">
          <span
            className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-paper bg-accent"
            aria-hidden="true"
          />
          <h3 className="text-lg font-semibold text-navy">
            {job.company} — {job.position}
          </h3>
          <p className="mt-1 text-sm text-muted">
            {dateRange(job.startDate, job.endDate, job.isCurrent)}
            {job.location ? ` | ${job.location}` : ''}
          </p>
          {job.summary ? <p className="mt-2 text-base leading-relaxed text-ink">{job.summary}</p> : null}
          {job.responsibilities.length > 0 ? (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-base leading-relaxed text-ink">
              {job.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {job.achievements.length > 0 ? (
            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Resume-reported results</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-base leading-relaxed text-ink">
                {job.achievements.map((item) => (
                  <li key={item}>{item.replace(/^Resume-reported:\s*/i, '')}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  )
}
