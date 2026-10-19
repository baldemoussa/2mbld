import { Check, UserRound } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading.tsx'
import { aboutParagraphs, aboutPoints } from '../data/content.ts'

export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-surface" aria-labelledby="about-heading">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:gap-10 sm:py-16 md:grid-cols-2">
        <div>
          <SectionHeading
            id="about-heading"
            title="About Me"
            icon={<UserRound className="h-7 w-7" aria-hidden="true" />}
          />
          <div className="max-w-xl space-y-4">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-7 text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <ul className="space-y-4 md:pt-14">
          {aboutPoints.map((point) => (
            <li key={point} className="flex items-start gap-3 text-sm text-ink">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
