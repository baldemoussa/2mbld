import { describe, expect, it } from 'vitest'
import { Education } from '../src/models/Education.js'
import { Experience } from '../src/models/Experience.js'
import { Profile } from '../src/models/Profile.js'
import { VolunteerExperience } from '../src/models/VolunteerExperience.js'

const start = new Date('2024-04-01T00:00:00.000Z')
const earlier = new Date('2020-01-01T00:00:00.000Z')

describe('model validation', () => {
  it('requires a profile name and email', async () => {
    const profile = new Profile({ headline: 'Engineer', summary: 'Summary' })
    await expect(profile.validate()).rejects.toThrow()
  })

  it('rejects an experience end date before the start date', async () => {
    const experience = new Experience({
      company: 'RENAPS',
      position: 'Analyst Programmer',
      employmentType: 'Full-time',
      startDate: start,
      endDate: earlier,
      isCurrent: false,
    })
    await expect(experience.validate()).rejects.toThrow(/endDate/)
  })

  it('rejects a current role that also has an end date', async () => {
    const experience = new Experience({
      company: 'RENAPS',
      position: 'Analyst Programmer',
      employmentType: 'Full-time',
      startDate: start,
      endDate: new Date('2025-01-01T00:00:00.000Z'),
      isCurrent: true,
    })
    await expect(experience.validate()).rejects.toThrow(/endDate/)
  })

  it('rejects a current volunteer role that also has an end date', async () => {
    const role = new VolunteerExperience({
      organization: 'The Welcoming Center',
      role: 'Facilitator',
      startDate: start,
      endDate: new Date('2025-06-01T00:00:00.000Z'),
      isCurrent: true,
    })
    await expect(role.validate()).rejects.toThrow(/endDate/)
  })

  it('rejects an education end date before the start date', async () => {
    const education = new Education({
      institution: 'Per Scholas',
      qualification: 'Software Engineering Training',
      startDate: start,
      endDate: earlier,
    })
    await expect(education.validate()).rejects.toThrow(/endDate/)
  })
})
