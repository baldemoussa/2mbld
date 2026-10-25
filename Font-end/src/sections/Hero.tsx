import { Download, User } from 'lucide-react'
import { featuredTechnologies, TechIcon } from '../components/TechIcon.tsx'
import { WorkspaceArt } from '../components/WorkspaceArt.tsx'
import type { Profile } from '../types/index.ts'

const fallbackHeadline = 'Oracle Developer | Full-Stack MERN | AI Native Software Engineer'
const fallbackSummary =
  'I modernize enterprise applications and build reliable software across Oracle technologies, relational databases, and modern full-stack development. I combine deep enterprise application experience with React, Node.js, TypeScript, REST APIs, and software engineering practices to deliver maintainable solutions.'

export function Hero({ profile }: { profile: Profile | null }) {
  const name = profile?.fullName || 'Mamadou Moussa BALDE'
  const headline = profile?.headline || fallbackHeadline
  const summary = profile?.summary || fallbackSummary
  const tagline = profile?.tagline || 'Better Code, Better Solutions.'
  const [given, surname] = splitName(name)

  return (
    <div id="home" className="scroll-mt-24 bg-[#07182c] text-white">
      <div className="lg:grid lg:grid-cols-[minmax(320px,46%)_minmax(0,1fr)]">
        <section
          className="relative h-[28rem] overflow-hidden bg-[#B7BBBC] sm:h-[36rem] lg:h-auto"
          aria-label="Portrait"
        >
          <Portrait name={name} url={profile?.portraitUrl} />
        </section>

        <div className="flex flex-col items-center justify-center gap-8 px-4 py-10 text-center sm:px-8 lg:items-start lg:px-12 lg:py-12 lg:text-left">
          <div className="w-full max-w-3xl">
            <p className="text-base text-slate-300">Hello, I'm</p>
            <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
              {given} <span className="text-accent">{surname}</span>
            </h1>
            <p className="mt-3 text-lg font-semibold leading-relaxed text-slate-200 sm:text-xl">{headline}</p>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">{summary}</p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="#experience"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white hover:bg-sky-700"
              >
                View My Experience
              </a>
              {profile?.resumeUrl ? (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download Resume
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
            </div>
          </div>
          <WorkspaceArt tagline={tagline} />
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p id="technologies-label" className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
            Technologies
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-3" aria-labelledby="technologies-label">
            {featuredTechnologies.map((tech) => (
              <li key={tech} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white">
                  <TechIcon name={tech} className="h-6 w-6" />
                </span>
                <span className="text-sm text-slate-100">{tech}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Portrait({ name, url }: { name: string; url?: string }) {
  if (url) {
    return (
      <img
        src={url}
        alt={`Portrait of ${name}`}
        className="absolute inset-0 h-full w-full object-cover object-center"
        width={1887}
        height={1887}
      />
    )
  }

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-600 to-slate-800 text-center"
      role="img"
      aria-label="Portrait placeholder. A photograph has not been added."
    >
      <User className="h-16 w-16 text-slate-200" aria-hidden="true" />
      <p className="mt-3 px-4 text-sm font-medium text-slate-100">Photo not added</p>
    </div>
  )
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length < 2) return [fullName, '']
  return [parts.slice(0, -1).join(' '), parts[parts.length - 1]]
}
