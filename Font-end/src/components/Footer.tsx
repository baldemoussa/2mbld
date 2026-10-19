import { GithubIcon, LinkedinIcon } from './BrandIcons.tsx'
import type { SocialLinks } from '../types/index.ts'

export function Footer({ socialLinks }: { socialLinks?: SocialLinks }) {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 text-center text-sm lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8 lg:text-left">
        <p className="font-semibold">
          <span className="font-normal text-slate-300">© {year}</span> Mamadou Moussa BALDE
        </p>
        <p className="text-center text-xs font-semibold tracking-[0.2em] text-slate-200">LEARN • BUILD • IMPROVE</p>
        <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-end">
          {socialLinks?.linkedin ? (
            <a
              href={socialLinks.linkedin}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:text-accent"
              aria-label="LinkedIn (opens in a new tab)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon />
            </a>
          ) : null}
          {socialLinks?.github ? (
            <a
              href={socialLinks.github}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:text-accent"
              aria-label="GitHub (opens in a new tab)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon />
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
