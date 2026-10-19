import { Profile } from '../models/Profile.js'
import { SkillCategory } from '../models/SkillCategory.js'
import { Experience } from '../models/Experience.js'
import { Education } from '../models/Education.js'
import { VolunteerExperience } from '../models/VolunteerExperience.js'
import { Work } from '../models/Work.js'
import {
  toEducationDto,
  toExperienceDto,
  toProfileDto,
  toSkillCategoryDto,
  toVolunteerDto,
  toWorkDto,
} from './dto.js'

export async function getPublishedProfile() {
  const profile = await Profile.findOne({ isPublished: true, email: { $exists: true } }).sort({
    updatedAt: -1,
  })
  return profile ? toProfileDto(profile) : null
}

export async function getPublishedSkills() {
  const categories = await SkillCategory.find({ isPublished: true }).sort({ sortOrder: 1, name: 1 })
  return categories.map((category) => toSkillCategoryDto(category))
}

export async function getPublishedExperiences() {
  const experiences = await Experience.find({ isPublished: true }).sort({
    sortOrder: 1,
    startDate: -1,
  })
  return experiences.map((experience) => toExperienceDto(experience))
}

export async function getPublishedEducation() {
  const entries = await Education.find({ isPublished: true }).sort({ sortOrder: 1, institution: 1 })
  return entries.map((entry) => toEducationDto(entry))
}

export async function getPublishedWorks() {
  const works = await Work.find({ isPublished: true }).sort({ sortOrder: 1, title: 1 })
  return works.map((work) => toWorkDto(work))
}

export async function getPublishedVolunteer() {
  const entries = await VolunteerExperience.find({ isPublished: true }).sort({
    sortOrder: 1,
    startDate: -1,
  })
  return entries.map((entry) => toVolunteerDto(entry))
}
