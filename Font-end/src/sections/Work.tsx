import { ArrowUpRight, FolderGit2 } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading.tsx'
import { TechIcon } from '../components/TechIcon.tsx'
import type { Work } from '../types/index.ts'

export function WorkSection({ works, status }: { works: Work[]; status: 'loading' | 'ready' | 'error' }) {
  return (
    <section id="work" className="scroll-mt-24 bg-paper" aria-labelledby="work-heading">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionHeading
          id="work-heading"
          title="Selected Work"
          icon={<FolderGit2 className="h-7 w-7" aria-hidden="true" />}
        />
        {status === 'loading' ? <p role="status" className="text-sm text-muted">Loading work…</p> : null}
        {status === 'error' ? <p role="alert" className="text-sm text-rose-700 dark:text-rose-300">Work could not be loaded.</p> : null}
        {status === 'ready' && works.length === 0 ? (
          <p className="text-sm text-muted">No published work is available yet.</p>
        ) : null}
        {status === 'ready' && works.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {works.map((work) => (
              <article key={work.slug} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
                {work.imageUrl ? (
                  <img
                    src={work.imageUrl}
                    alt={`Overview of ${work.title}`}
                    className="h-52 w-full object-cover object-top"
                    width={640}
                    height={208}
                  />
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-navy">{work.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{work.summary}</p>
                {work.highlights.length > 0 ? (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink">
                    {work.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {work.technologies.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${work.title} technologies`}>
                    {work.technologies.map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-ink"
                      >
                        <TechIcon name={item} className="h-3.5 w-3.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
                  <a
                    href={work.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Repository for ${work.title} (opens in a new tab)`}
                    className="inline-flex items-center gap-1 text-accent hover:underline"
                  >
                    Repository
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  {work.liveUrl ? (
                    <a
                      href={work.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Live app for ${work.title} (opens in a new tab)`}
                      className="inline-flex items-center gap-1 text-navy hover:text-accent"
                    >
                      Live app
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
