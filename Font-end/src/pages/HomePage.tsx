import { useEffect } from 'react'
import { Footer } from '../components/Footer.tsx'
import { Header } from '../components/Header.tsx'
import { usePortfolio } from '../hooks/usePortfolio.ts'
import { About } from '../sections/About.tsx'
import { Capabilities } from '../sections/Capabilities.tsx'
import { ExperienceBand } from '../sections/Experience.tsx'
import { Hero } from '../sections/Hero.tsx'
import { Skills } from '../sections/Skills.tsx'
import { WorkSection } from '../sections/Work.tsx'
import { recordVisit } from '../services/api.ts'

export function HomePage() {
  const state = usePortfolio()

  useEffect(() => {
    void recordVisit().catch(() => undefined)
  }, [])
  const ready = state.status === 'ready' ? state.data : null
  const sectionStatus = state.status === 'ready' ? 'ready' : state.status

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        {state.status === 'error' ? (
          <p role="alert" className="bg-rose-50 px-4 py-3 text-center text-sm text-rose-800 dark:bg-rose-400/10 dark:text-rose-200">
            {state.message}
          </p>
        ) : null}
        <Hero profile={ready?.profile ?? null} />
        <About />
        <Skills categories={ready?.skills ?? []} status={sectionStatus} />
        <Capabilities />
        <WorkSection works={ready?.works ?? []} status={sectionStatus} />
        <ExperienceBand
          experiences={ready?.experiences ?? []}
          education={ready?.education ?? []}
          volunteer={ready?.volunteer ?? []}
          profile={ready?.profile ?? null}
          status={sectionStatus}
        />
      </main>
      <Footer socialLinks={ready?.profile?.socialLinks} />
    </>
  )
}
