import type { NextFunction, Request, Response } from 'express'
import {
  getPublishedEducation,
  getPublishedExperiences,
  getPublishedProfile,
  getPublishedSkills,
  getPublishedVolunteer,
  getPublishedWorks,
} from '../services/contentService.js'

export async function getProfile(_req: Request, res: Response, next: NextFunction) {
  try {
    const profile = await getPublishedProfile()
    if (!profile) {
      res.status(404).json({ error: { message: 'Profile not found.' } })
      return
    }
    res.json({ profile })
  } catch (error) {
    next(error)
  }
}

export async function getSkills(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json({ skills: await getPublishedSkills() })
  } catch (error) {
    next(error)
  }
}

export async function getExperiences(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json({ experiences: await getPublishedExperiences() })
  } catch (error) {
    next(error)
  }
}

export async function getEducation(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json({ education: await getPublishedEducation() })
  } catch (error) {
    next(error)
  }
}

export async function getWorks(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json({ works: await getPublishedWorks() })
  } catch (error) {
    next(error)
  }
}

export async function getVolunteer(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json({ volunteerExperiences: await getPublishedVolunteer() })
  } catch (error) {
    next(error)
  }
}
