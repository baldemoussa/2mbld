import type { ProfileDocument } from '../models/Profile.js'
import type { SkillCategoryDocument } from '../models/SkillCategory.js'
import type { ExperienceDocument } from '../models/Experience.js'
import type { EducationDocument } from '../models/Education.js'
import type { VolunteerDocument } from '../models/VolunteerExperience.js'
import type { ContactMessageDocument } from '../models/ContactMessage.js'
import type { WorkDocument } from '../models/Work.js'

function iso(value: Date | null | undefined): string | null {
  if (!value) return null
  return value.toISOString()
}

function clean(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

export type ProfileDto = {
  fullName: string
  headline: string
  tagline: string
  summary: string
  location: string
  email: string
  portraitUrl?: string
  resumeUrl?: string
  socialLinks: {
    linkedin?: string
    github?: string
  }
}

export function toProfileDto(doc: ProfileDocument): ProfileDto {
  return {
    fullName: doc.fullName,
    headline: doc.headline,
    tagline: doc.tagline || 'Better Code, Better Solutions.',
    summary: doc.summary,
    location: doc.location || 'Philadelphia, Pennsylvania',
    email: doc.email,
    portraitUrl: clean(doc.portraitUrl),
    resumeUrl: clean(doc.resumeUrl),
    socialLinks: {
      linkedin: clean(doc.socialLinks?.linkedin),
      github: clean(doc.socialLinks?.github),
    },
  }
}

export function toSkillCategoryDto(doc: SkillCategoryDocument) {
  const skills = [...(doc.skills ?? [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
  return {
    name: doc.name,
    slug: doc.slug,
    description: clean(doc.description),
    icon: clean(doc.icon),
    sortOrder: doc.sortOrder ?? 0,
    skills: skills.map((skill) => ({
      name: skill.name,
      icon: clean(skill.icon),
      sortOrder: skill.sortOrder ?? 0,
    })),
  }
}

export function toExperienceDto(doc: ExperienceDocument) {
  return {
    company: doc.company,
    position: doc.position,
    location: clean(doc.location),
    employmentType: doc.employmentType,
    startDate: iso(doc.startDate),
    endDate: iso(doc.endDate),
    isCurrent: Boolean(doc.isCurrent),
    summary: clean(doc.summary),
    responsibilities: doc.responsibilities ?? [],
    achievements: doc.achievements ?? [],
    technologies: doc.technologies ?? [],
    sortOrder: doc.sortOrder ?? 0,
  }
}

export function toEducationDto(doc: EducationDocument) {
  return {
    institution: doc.institution,
    qualification: doc.qualification,
    fieldOfStudy: clean(doc.fieldOfStudy),
    location: clean(doc.location),
    startDate: iso(doc.startDate),
    endDate: iso(doc.endDate),
    status: doc.status ?? 'Not Specified',
    description: clean(doc.description),
    sortOrder: doc.sortOrder ?? 0,
  }
}

export function toVolunteerDto(doc: VolunteerDocument) {
  return {
    organization: doc.organization,
    role: doc.role,
    startDate: iso(doc.startDate),
    endDate: iso(doc.endDate),
    isCurrent: Boolean(doc.isCurrent),
    description: clean(doc.description),
    contributions: doc.contributions ?? [],
    sortOrder: doc.sortOrder ?? 0,
  }
}

export function toWorkDto(doc: WorkDocument) {
  return {
    title: doc.title,
    slug: doc.slug,
    summary: doc.summary,
    repositoryUrl: doc.repositoryUrl,
    liveUrl: clean(doc.liveUrl),
    imageUrl: clean(doc.imageUrl),
    technologies: doc.technologies ?? [],
    highlights: doc.highlights ?? [],
    sortOrder: doc.sortOrder ?? 0,
  }
}

export function toMessageDto(doc: ContactMessageDocument & { _id: unknown; createdAt?: Date }) {
  return {
    id: String(doc._id),
    name: doc.name,
    email: doc.email,
    subject: doc.subject ?? '',
    message: doc.message,
    status: doc.status,
    repliedAt: iso(doc.repliedAt),
    createdAt: doc.createdAt ? doc.createdAt.toISOString() : null,
  }
}
