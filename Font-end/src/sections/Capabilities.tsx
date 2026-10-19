import { Cog } from 'lucide-react'
import { IconBadge } from '../components/IconBadge.tsx'
import { SectionHeading } from '../components/SectionHeading.tsx'
import { capabilities } from '../data/content.ts'

export function Capabilities() {
  return (
    <section className="bg-surface" aria-labelledby="capabilities-heading">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionHeading
          id="capabilities-heading"
          title="Professional Capabilities"
          icon={<Cog className="h-7 w-7" aria-hidden="true" />}
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((item) => (
            <article key={item.title} className="rounded-2xl border border-line bg-paper p-5 shadow-card">
              <IconBadge name={item.icon} />
              <h3 className="mt-4 font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
