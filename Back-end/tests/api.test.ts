import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import { createApp } from '../src/app.js'
import { ContactMessage } from '../src/models/ContactMessage.js'
import { Visit } from '../src/models/Visit.js'
import { Experience } from '../src/models/Experience.js'
import { Profile } from '../src/models/Profile.js'
import { SkillCategory } from '../src/models/SkillCategory.js'
import { Work } from '../src/models/Work.js'

const app = createApp()

async function seedProfile() {
  await Profile.create({
    fullName: 'Mamadou Moussa BALDE',
    headline: 'Oracle Developer',
    summary: 'Enterprise applications and full-stack software.',
    email: 'lebaldem2@gmail.com',
    isPublished: true,
    socialLinks: { github: 'https://github.com/baldemoussa' },
  })
  await Profile.create({
    fullName: 'Hidden Draft',
    headline: 'Draft',
    summary: 'Not public.',
    email: 'draft@example.com',
    isPublished: false,
  })
}

describe('public API', () => {
  beforeEach(async () => {
    await seedProfile()
    await SkillCategory.create({
      name: 'Hidden',
      slug: 'hidden-skills',
      sortOrder: 0,
      isPublished: false,
      skills: [{ name: 'Secret', sortOrder: 0 }],
    })
    await SkillCategory.create({
      name: 'Databases',
      slug: 'databases',
      sortOrder: 2,
      isPublished: true,
      skills: [{ name: 'PostgreSQL', sortOrder: 0 }],
    })
    await SkillCategory.create({
      name: 'Oracle & Enterprise Technologies',
      slug: 'oracle-enterprise',
      sortOrder: 0,
      isPublished: true,
      skills: [{ name: 'PL/SQL', sortOrder: 0 }],
    })
    await Work.create({
      title: 'Pro-Tasker',
      slug: 'pro-tasker',
      summary: 'A shared project board.',
      repositoryUrl: 'https://github.com/baldemoussa/Full-Stack-MERN-Application-Pro-Tasker',
      liveUrl: 'https://full-stack-mern-application-pro-tasker-1.onrender.com',
      technologies: ['React'],
      highlights: ['Tasks move across columns.'],
      sortOrder: 1,
      isPublished: true,
    })
    await Work.create({
      title: 'Hidden lab',
      slug: 'hidden-lab',
      summary: 'Not for the public page.',
      repositoryUrl: 'https://github.com/baldemoussa/hidden-lab',
      sortOrder: 0,
      isPublished: false,
    })
    await Experience.create({
      company: 'RENAPS',
      position: 'Analyst Programmer',
      employmentType: 'Full-time',
      startDate: new Date('2024-04-01T00:00:00.000Z'),
      isCurrent: true,
      responsibilities: ['Modernized Oracle Forms & Reports systems.'],
      isPublished: true,
      sortOrder: 0,
    })
  })

  it('returns only the published profile', async () => {
    const response = await request(app).get('/api/v1/profile')
    expect(response.status).toBe(200)
    expect(response.body.profile.fullName).toBe('Mamadou Moussa BALDE')
    expect(response.body.profile.email).toBe('lebaldem2@gmail.com')
    expect(JSON.stringify(response.body)).not.toContain('Hidden Draft')
  })

  it('returns published skill categories in sort order', async () => {
    const response = await request(app).get('/api/v1/skills')
    expect(response.status).toBe(200)
    expect(response.body.skills.map((category: { slug: string }) => category.slug)).toEqual([
      'oracle-enterprise',
      'databases',
    ])
  })

  it('returns published experience', async () => {
    const response = await request(app).get('/api/v1/experiences')
    expect(response.status).toBe(200)
    expect(response.body.experiences).toHaveLength(1)
    expect(response.body.experiences[0].company).toBe('RENAPS')
    expect(response.body.experiences[0].isCurrent).toBe(true)
  })

  it('returns published work in sort order', async () => {
    const response = await request(app).get('/api/v1/works')
    expect(response.status).toBe(200)
    expect(response.body.works).toHaveLength(1)
    expect(response.body.works[0].slug).toBe('pro-tasker')
    expect(response.body.works[0].liveUrl).toBe(
      'https://full-stack-mern-application-pro-tasker-1.onrender.com',
    )
  })

  it('does not expose a projects endpoint', async () => {
    const response = await request(app).get('/api/v1/projects')
    expect(response.status).toBe(404)
  })
})

describe('contact submission', () => {
  it('stores a valid message and hides it from the public', async () => {
    const created = await request(app).post('/api/v1/contact').send({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'Hello, I would like to talk about Oracle modernization.',
    })
    expect(created.status).toBe(201)
    expect(created.body.message).toMatch(/received/i)
    expect(created.body.id).toBeUndefined()

    const stored = await ContactMessage.findOne({ email: 'ada@example.com' })
    expect(stored?.status).toBe('New')

    const listing = await request(app).get('/api/v1/contact')
    expect(listing.status).toBe(404)
  })

  it('rejects a message that is too short', async () => {
    const response = await request(app).post('/api/v1/contact').send({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'short',
    })
    expect(response.status).toBe(400)
    expect(await ContactMessage.countDocuments()).toBe(0)
  })

  it('does not store a submission that fills the honeypot', async () => {
    const response = await request(app).post('/api/v1/contact').send({
      name: 'Bot User',
      email: 'bot@example.com',
      message: 'This is an automated message that should be ignored.',
      website: 'https://spam.example',
    })
    expect(response.status).toBe(201)
    expect(await ContactMessage.countDocuments({ email: 'bot@example.com' })).toBe(0)
  })
})

describe('visitor counts', () => {
  it('counts one browser once in the same month', async () => {
    const agent = request.agent(app)
    const first = await agent.post('/api/v1/visits')
    expect(first.status).toBe(201)
    const cookies = first.headers['set-cookie']
    const joined = Array.isArray(cookies) ? cookies.join(';') : (cookies ?? '')
    expect(joined).toContain('visitor_id=')

    const second = await agent.post('/api/v1/visits')
    expect(second.status).toBe(201)
    expect(await Visit.countDocuments()).toBe(1)
  })

  it('counts one supplied visitor id once when two requests arrive together', async () => {
    const visitorId = 'd'.repeat(32)
    const [first, second] = await Promise.all([
      request(app).post('/api/v1/visits').send({ visitorId }),
      request(app).post('/api/v1/visits').send({ visitorId }),
    ])
    expect(first.status).toBe(201)
    expect(second.status).toBe(201)
    expect(await Visit.countDocuments({ visitorId })).toBe(1)
  })

  it('keeps monthly counts behind the administrator login', async () => {
    process.env.ADMIN_EMAIL = 'owner@example.com'
    process.env.ADMIN_PASSWORD = 'portfolio1'
    const hidden = await request(app).get('/api/v1/admin/visits')
    expect(hidden.status).toBe(401)

    await Visit.create({ visitorId: 'a'.repeat(32), month: '2026-09' })
    await Visit.create({
      visitorId: 'b'.repeat(32),
      month: '2026-10',
      country: 'United States',
      city: 'Philadelphia',
    })
    await Visit.create({
      visitorId: 'c'.repeat(32),
      month: '2026-10',
      country: 'Guinea',
      city: 'Conakry',
    })
    await Visit.create({
      visitorId: 'e'.repeat(32),
      month: '2026-10',
      country: 'United States',
      city: 'Philadelphia',
    })

    const agent = request.agent(app)
    const login = await agent.post('/api/v1/admin/login').send({
      email: 'owner@example.com',
      password: 'portfolio1',
    })
    expect(login.status).toBe(200)

    const counts = await agent.get('/api/v1/admin/visits')
    expect(counts.status).toBe(200)
    expect(counts.body.visits).toEqual([
      {
        month: '2026-10',
        count: 3,
        locations: [
          { country: 'United States', city: 'Philadelphia', count: 2 },
          { country: 'Guinea', city: 'Conakry', count: 1 },
        ],
      },
      {
        month: '2026-09',
        count: 1,
        locations: [{ country: '', city: '', count: 1 }],
      },
    ])
    expect(JSON.stringify(counts.body)).not.toContain('a'.repeat(32))
  })
})

describe('admin access', () => {
  const email = 'owner@example.com'
  const password = 'portfolio1'

  beforeEach(async () => {
    process.env.ADMIN_EMAIL = email
    process.env.ADMIN_PASSWORD = password
    await ContactMessage.create({
      name: 'Grace Hopper',
      email: 'grace@example.com',
      message: 'Can we discuss a database modernization role?',
    })
  })

  it('rejects message reads without authentication', async () => {
    const response = await request(app).get('/api/v1/admin/messages')
    expect(response.status).toBe(401)
  })

  it('uses the same error for an unknown account and a wrong password', async () => {
    const unknown = await request(app)
      .post('/api/v1/admin/login')
      .send({ email: 'missing@example.com', password: 'portfolio1' })
    const wrong = await request(app)
      .post('/api/v1/admin/login')
      .send({ email, password: 'wrong-password' })
    expect(unknown.status).toBe(401)
    expect(wrong.status).toBe(401)
    expect(unknown.body).toEqual(wrong.body)
  })

  it('lets an authenticated admin read and update a message', async () => {
    const agent = request.agent(app)
    const login = await agent.post('/api/v1/admin/login').send({ email, password })
    expect(login.status).toBe(200)

    const cookies = login.headers['set-cookie']
    const csrf = csrfToken(cookies)
    expect(csrf).toBeTruthy()

    const list = await agent.get('/api/v1/admin/messages')
    expect(list.status).toBe(200)
    expect(list.body.total).toBe(1)
    const id = list.body.messages[0].id as string

    const updated = await agent
      .patch(`/api/v1/admin/messages/${id}`)
      .set('x-csrf-token', csrf)
      .send({ status: 'Read' })
    expect(updated.status).toBe(200)
    expect(updated.body.message.status).toBe('Read')

    const blocked = await agent.patch(`/api/v1/admin/messages/${id}`).send({ status: 'Archived' })
    expect(blocked.status).toBe(403)
  })
})

function csrfToken(header: string | string[] | undefined) {
  const cookies = Array.isArray(header) ? header : header ? [header] : []
  const match = cookies.find((cookie) => cookie.startsWith('csrf_token='))
  return match?.split(';')[0]?.slice('csrf_token='.length) ?? ''
}
