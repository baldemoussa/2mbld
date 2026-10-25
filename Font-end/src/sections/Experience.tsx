import { Briefcase, GraduationCap, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons.tsx'
import { ExperienceTimeline } from '../components/ExperienceTimeline.tsx'
import { SectionHeading } from '../components/SectionHeading.tsx'
import { ContactForm } from './Contact.tsx'
import { FALLBACK_EMAIL } from '../data/content.ts'
import type { Education as EducationItem, Experience, Profile, VolunteerExperience } from '../types/index.ts'
import { dateRange } from '../utils/dates.ts'

export function ExperienceBand({
  experiences,
  education,
  volunteer,
  profile,
  status,
}: {
  experiences: Experience[]
  education: EducationItem[]
  volunteer: VolunteerExperience[]
  profile: Profile | null
  status: 'loading' | 'ready' | 'error'
}) {
  const email = profile?.email || FALLBACK_EMAIL
  const links = profile?.socialLinks

  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:py-16 lg:grid-cols-12 lg:gap-10">
        <div id="experience" className="scroll-mt-24 lg:col-span-7" role="region" aria-labelledby="experience-heading">
          <SectionHeading
            id="experience-heading"
            title="Professional Experience"
            icon={<Briefcase className="h-7 w-7" aria-hidden="true" />}
          />
          {status === 'loading' ? <p role="status" className="text-sm text-muted">Loading experience…</p> : null}
          {status === 'error' ? <p role="alert" className="text-sm text-rose-700 dark:text-rose-300">Experience could not be loaded.</p> : null}
          {status === 'ready' ? <ExperienceTimeline experiences={experiences} /> : null}
        </div>

        <div className="space-y-12 lg:col-span-5">
        <div id="education" className="scroll-mt-24" role="region" aria-labelledby="education-heading">
          <SectionHeading id="education-heading" title="Education" icon={<GraduationCap className="h-7 w-7" aria-hidden="true" />} />
          {status === 'loading' ? <p role="status" className="text-sm text-muted">Loading education…</p> : null}
          {status === 'error' ? <p role="alert" className="text-sm text-rose-700 dark:text-rose-300">Education could not be loaded.</p> : null}
          {status === 'ready' ? (
            <div className="space-y-6">
              {education.length === 0 ? <p className="text-sm text-muted">No published education is available yet.</p> : null}
              <ul className="space-y-5">
                {education.map((item) => (
                  <li key={`${item.institution}-${item.qualification}`}>
                    <h3 className="text-lg font-semibold text-navy">
                      {item.institution} — {item.qualification}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{educationMeta(item)}</p>
                    {item.description ? <p className="mt-1 text-base leading-relaxed text-muted">{item.description}</p> : null}
                  </li>
                ))}
              </ul>
              {volunteer.length > 0 ? (
                <div>
                  <h3 className="text-lg font-semibold text-navy">Community involvement</h3>
                  <p className="mt-3 text-base font-medium text-ink">{volunteer[0].organization}</p>
                  <ul className="mt-2 list-disc space-y-3 pl-5 text-base leading-relaxed text-ink">
                    {volunteer.map((item) => (
                      <li key={item.role}>
                        <p>{item.role}</p>
                        <p className="text-sm text-muted">{dateRange(item.startDate, item.endDate, item.isCurrent)}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div>
                <h3 className="text-lg font-semibold text-navy">Quick Links</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a className="inline-flex items-center gap-2 break-all text-accent hover:underline" href={`mailto:${email}`}>
                      <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {email}
                    </a>
                  </li>
                  {links?.linkedin ? (
                    <li>
                      <a
                        className="inline-flex items-center gap-2 text-ink hover:text-accent"
                        href={links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkedinIcon />
                        LinkedIn
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ) : null}
                  {links?.github ? (
                    <li>
                      <a
                        className="inline-flex items-center gap-2 text-ink hover:text-accent"
                        href={links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GithubIcon />
                        GitHub
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          ) : null}
        </div>

        <ContactForm email={email} />
        </div>
      </div>
    </section>
  )
}

function educationMeta(item: EducationItem) {
  const when = item.startDate || item.endDate ? dateRange(item.startDate, item.endDate, false) : ''
  const status = item.status && item.status !== 'Not Specified' ? item.status : ''
  return [when, item.location, status].filter(Boolean).join(' | ')
}
