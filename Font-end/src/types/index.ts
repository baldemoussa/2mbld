export type SocialLinks = {
  linkedin?: string
  github?: string
}

export type Profile = {
  fullName: string
  headline: string
  tagline: string
  summary: string
  location: string
  email: string
  portraitUrl?: string
  resumeUrl?: string
  socialLinks: SocialLinks
}

export type Skill = {
  name: string
  icon?: string
  sortOrder: number
}

export type SkillCategory = {
  name: string
  slug: string
  description?: string
  icon?: string
  sortOrder: number
  skills: Skill[]
}

export type Experience = {
  company: string
  position: string
  location?: string
  employmentType: string
  startDate: string | null
  endDate: string | null
  isCurrent: boolean
  summary?: string
  responsibilities: string[]
  achievements: string[]
  technologies: string[]
  sortOrder: number
}

export type Education = {
  institution: string
  qualification: string
  fieldOfStudy?: string
  location?: string
  startDate: string | null
  endDate: string | null
  status: string
  description?: string
  sortOrder: number
}

export type VolunteerExperience = {
  organization: string
  role: string
  startDate: string | null
  endDate: string | null
  isCurrent: boolean
  description?: string
  contributions: string[]
  sortOrder: number
}

export type Work = {
  title: string
  slug: string
  summary: string
  repositoryUrl: string
  liveUrl?: string
  imageUrl?: string
  technologies: string[]
  highlights: string[]
  sortOrder: number
}

export type PortfolioData = {
  profile: Profile | null
  skills: SkillCategory[]
  experiences: Experience[]
  education: Education[]
  volunteer: VolunteerExperience[]
  works: Work[]
}

export type VisitLocation = {
  country: string
  city: string
  count: number
}

export type MonthlyVisit = {
  month: string
  count: number
  locations: VisitLocation[]
}

export type ContactMessage = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'New' | 'Read' | 'Replied' | 'Archived'
  repliedAt: string | null
  createdAt: string | null
}
