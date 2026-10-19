import { useEffect, useState } from 'react'
import {
  getEducation,
  getExperiences,
  getProfile,
  getSkills,
  getVolunteer,
  getWorks,
} from '../services/api.ts'
import type { PortfolioData } from '../types/index.ts'

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; data: PortfolioData }

export function usePortfolio(): State {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    let active = true
    Promise.all([getProfile(), getSkills(), getExperiences(), getEducation(), getVolunteer(), getWorks()])
      .then(([profile, skills, experiences, education, volunteer, works]) => {
        if (!active) return
        setState({
          status: 'ready',
          data: { profile, skills, experiences, education, volunteer, works },
        })
      })
      .catch(() => {
        if (!active) return
        setState({
          status: 'error',
          message: 'The portfolio content could not be loaded. Refresh the page or use the email link.',
        })
      })
    return () => {
      active = false
    }
  }, [])

  return state
}
