# Portfolio documentation

This is the description of the built site. Setup commands and environment variables are in `README.md`. Published wording lives in `Back-end/src/seed/portfolio.ts`.

## What the site is

A responsive single-page portfolio for Mamadou Moussa BALDE. It presents Oracle enterprise work, application modernization, databases, and full-stack software engineering. The public page loads published records from MongoDB. A contact form stores messages. Opening the page records one distinct visit for that browser during the current month. An administrator reads the messages and the monthly visitor counts at `/admin`.

The repository folders are `Back-end` and `Font-end`.

## Stack

Frontend: React 19, Vite 8, TypeScript, Tailwind CSS 3, Lucide, React Router. Routes are `/` and `/admin`.

Backend: Node.js 20, Express 5, Mongoose 9, Zod 3, Helmet, CORS, cookie-parser, express-rate-limit, bcrypt, and JWT. Tests use Vitest, Supertest, and mongodb-memory-server.

The API listens on port `3001`. Vite serves the site at `http://localhost:5173` and proxies `/api` to the API when `VITE_API_URL` is empty.

## Public page

The header links to Home, About, Skills, Work, Experience, Education, and Contact. A theme control switches light and dark mode. Dark mode is the default. The page opens in light mode only when `localStorage` key `portfolio-theme` is `light`. Navy `#0B1F36` and accent `#0B6FDB` stay fixed. The hero, header, footer, and workspace card stay dark in both modes.

Sections, in order:

1. Hero. The portrait fills the left side. The introduction, buttons, and workspace card sit on the right. Technologies span the full width underneath. On a small screen the portrait stacks above centered text and a centered workspace card.
2. About. Two short paragraphs and five focus points, written in `Font-end/src/data/content.ts`.
3. Technology Stack. Four skill groups from the API.
4. Professional Capabilities. Four static cards in `Font-end/src/data/content.ts`.
5. Selected Work. Eight published apps, each with an image, summary, highlights, repository link, and a live link when one exists.
6. Professional Experience. Employment history, newest first.
7. Education, then community involvement under the same heading.
8. Contact. Email, LinkedIn, GitHub, and the message form. After a successful send, the form is replaced by the confirmation "Your message has been received." A failed send leaves the form in place.
9. Footer. One line on the left, `©` and the current year, then the name. The center is LEARN • BUILD • IMPROVE. The right side is LinkedIn and GitHub. The role line appears only in the hero.

The phone number is not rendered. It stays inside the downloadable resume PDF.

## Published profile

- Name: Mamadou Moussa BALDE
- Headline: Oracle Developer | Full-Stack MERN Developer | Software Engineer
- Tagline: Better Code, Better Solutions.
- Location: Philadelphia, Pennsylvania
- Email: lebaldem2@gmail.com
- Portrait: `/images/profile.jpg`
- Resume: [Google Drive](https://drive.google.com/file/d/1rG-ISGIcCkcbJP1l-nsGz_ydsryQkqGE/view?usp=sharing)
- GitHub: `https://github.com/baldemoussa`
- LinkedIn: `https://www.linkedin.com/in/2mb/`

## Skills

Four groups, shown as a two-by-two grid from the `md` breakpoint up:

- Oracle & Enterprise Technologies: Oracle Forms & Reports (6i–12c), Oracle Database, SQL, PL/SQL, Oracle WebLogic Server, Oracle APEX.
- Full-Stack MERN: JavaScript, TypeScript, React, Node.js, Express.js, HTML5, CSS3, Java, RESTful APIs.
- Databases: PostgreSQL, MongoDB, Microsoft SQL Server, MySQL, relational database design, SQL optimization.
- Engineering, Testing, Delivery & AI: unit and integration testing, test automation, code reviews, refactoring, Git, GitHub Actions, TortoiseSVN, Agile/Scrum, technical documentation, secure coding, Netlify, Render, JIRA, Figma, Prompt engineering, Microsoft Copilot, Claude Code, Cursor AI, Codex.

Oracle BI Publisher, ChatGPT, and OWASP Top Ten are not in the skill list.

The hero chip row is separate and lists Oracle, PostgreSQL, MongoDB, React, Node.js, TypeScript, JavaScript, and Java.

## Experience

Dates are month and year. The current wording of each bullet is in the seed file.

| Role | Dates | Location |
| --- | --- | --- |
| RENAPS — Analyst Programmer | April 2024 – Present | United States |
| AFENET — IT Systems Administrator & Data Analyst | September 2020 – September 2023 | Conakry, Guinea |
| ETI S.A. — Senior Application Design & Development Engineer | January 2011 – August 2020 | Conakry, Guinea |
| Université Mercure International — Web Technologies Instructor | September 2011 – February 2017 | Conakry, Guinea |
| ETI S.A. — Software Development Intern, Oracle Fusion Middleware | August 2010 – December 2010 | Guinea |
| Rapidass — Web Application Development Intern | January 2010 – July 2010 | Conakry, Guinea |

The Mercure role overlaps the senior ETI role. That is concurrent teaching and employment. “Licence 3” in the Mercure bullets is the student year that was taught.

## Education and community involvement

- Per Scholas — AI native Software Engineering Training. Philadelphia, PA. October 2026. Completed.
- University of Conakry — Bachelor in Computer Science. Conakry, Guinea. Completed. The description names Gamal Abdel Nasser University of Conakry, 2006–2010, the Diplôme de Maîtrise (2010) in Computer Science Applied to Business Management, and the World Education Services evaluation of October 9, 2024. WES equates that diplôme to a U.S. bachelor's degree, with 133 semester credits and a GPA of 3.92. The page does not call the maîtrise a U.S. master's degree, and it does not list the Diplôme de Licence.

Community involvement is one organization, The Welcoming Center, with three roles:

- Digital Bridge Program Facilitator, September 2025 – June 2026
- Immigrant Leadership Institute Participant, February 2024 – April 2025
- Digital Skills Workshop Assistant Instructor, February 2024 – April 2024

## Selected work

Pro-Tasker, AI Cooking Assistant, REST Countries, IP Address Tracker, Recipe Discovery, Task Management App, Digital Bookshelf API, and Movie Finder API. Images are in `Font-end/public/images/works/`. Pro-Tasker, AI Cooking Assistant, and Task Management App have live URLs.

## How data moves

The page does not read `portfolio.ts` directly. That file is the copy you edit. `npm run seed` writes it into MongoDB. The API reads MongoDB. The React page asks the API for the published records once, when the page opens.

```text
portfolio.ts  --npm run seed-->  MongoDB  --GET /api/v1/...-->  React page
```

A contact message travels the other way. The form posts to the API, and the API inserts a document in `contactmessages`. The seed never writes or deletes those messages.

Opening the public page records a visit. The browser creates a random id, stores it in `localStorage` under `portfolio-visitor`, and sends it to `POST /api/v1/visits`. The API also sets an httpOnly `visitor_id` cookie. One document in `visits` is that id, the UTC month, and the country and city when they can be identified. The id and month are unique, so the same browser is counted once in that month. A reload does not add a count. A new month, a different browser, or cleared site data counts again. The admin page shows the month and the count, newest month first, and does not show the id. The seed never writes or deletes visit rows. The totals are visible only after administrator sign-in.

Two parts of the page are not in the database. About paragraphs, capability cards, navigation labels, the hero technology chips, and the footer motto are constants in `Font-end/src/data/content.ts`, `Hero.tsx`, and `Footer.tsx`.

`Back-end/src/models/Experience.ts` and the other model files only describe the allowed fields and limits. Editing a model file does not change the text on the page.

## Data model

Each kind of content is its own MongoDB collection. Documents are not linked by ids. The public API returns every published document in a collection, and the page lays them out together. There is no Projects collection. The seed drops leftover `projects`, `skills`, `timelineitems`, `users`, `messages`, and `adminusers` collections from the earlier version when they still exist.

| Collection | Model file | What one document is | Seed match key |
| --- | --- | --- | --- |
| `profiles` | `models/Profile.ts` | The public identity: name, summary, portrait, resume, links | `email` |
| `skillcategories` | `models/SkillCategory.ts` | One skill group, with its skills stored inside the same document | `slug` |
| `experiences` | `models/Experience.ts` | One job: company, title, dates, and bullets | `company` + `position` |
| `educations` | `models/Education.ts` | One school or training program | `institution` + `qualification` |
| `volunteerexperiences` | `models/VolunteerExperience.ts` | One community role | `organization` + `role` |
| `works` | `models/Work.ts` | One selected app | `slug` |
| `contactmessages` | `models/ContactMessage.ts` | One message from the contact form | not seeded |
| `visits` | `models/Visit.ts` | One browser counted in one UTC month | not seeded |

Only documents with `isPublished: true` are returned. The profile query also requires an email and keeps the most recently updated match.

## Data structure

Dates in the seed use `utc(year, month)`, which stores the first day of that month in UTC. `utc(2024, 4)` is April 2024. The API sends dates as ISO strings such as `2024-04-01T00:00:00.000Z`. The page prints the month name and year in UTC, so the day is never shown. Leave a date unset when the month is unknown. Do not invent one.

A current job or volunteer role must have `isCurrent: true` and `endDate: null`. An end date cannot be earlier than the start date.

`portraitUrl`, `resumeUrl`, and a work `imageUrl` accept an `http(s)` URL or a root-relative site path such as `/images/profile.jpg`. The path must not start with `//` and must not contain `..` or `\`.

### Profile

```ts
{
  fullName: string          // required, max 120
  headline: string          // required, max 180
  tagline: string           // max 120
  summary: string           // required, max 2000
  location: string          // max 120
  email: string             // required
  portraitUrl: string
  resumeUrl: string
  socialLinks: { linkedin?: string; github?: string }
  isPublished: boolean
}
```

### Skill category

Skills are embedded. They are not separate documents.

```ts
{
  name: string              // required, max 80
  slug: string              // required, unique, lowercase letters, numbers, hyphens
  description: string       // max 300
  icon: string              // max 40, a small icon name used by the page
  sortOrder: number
  isPublished: boolean
  skills: [
    { name: string; icon?: string; sortOrder: number }  // name max 80
  ]
}
```

### Experience

This is the shape of one Professional Experience entry. `responsibilities` is the bullet list on the page. `achievements` is optional and, when present, is shown under the label "Resume-reported results". The current roles leave `achievements` empty and put the results inside `responsibilities`.

```ts
{
  company: string                 // required, max 120
  position: string                // required, max 160
  location: string                // max 120
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Volunteer' | 'Other'
  startDate: Date                 // required
  endDate: Date | null
  isCurrent: boolean
  summary: string                 // max 500, shown above the bullets when set
  responsibilities: string[]      // up to 12 bullets, 400 characters each
  achievements: string[]          // up to 8, 400 characters each
  technologies: string[]          // up to 20, 80 characters each; stored, not shown on the timeline
  sortOrder: number               // lower numbers appear first
  isPublished: boolean
}
```

A stored RENAPS record looks like this after seeding:

```ts
{
  company: 'RENAPS',
  position: 'Analyst Programmer',
  location: 'United States',
  employmentType: 'Full-time',
  startDate: '2024-04-01T00:00:00.000Z',
  endDate: null,
  isCurrent: true,
  responsibilities: [
    'Modernized multiple enterprise applications by migrating legacy Oracle Forms & Reports (6i–12c) systems to React, Node.js, Java, and PostgreSQL, improving application scalability, maintainability, and long-term system performance.',
  ],
  achievements: [],
  technologies: ['Oracle Forms & Reports', 'PL/SQL', 'SQL', 'React', 'Node.js', 'Java', 'PostgreSQL', 'SVN', 'GitHub'],
  sortOrder: 0,
  isPublished: true,
}
```

The page prints `company — position`, then the date range and location, then each responsibility as a bullet.

### Education

```ts
{
  institution: string        // required, max 160
  qualification: string      // required, max 160
  fieldOfStudy: string       // max 120; stored, the page uses description for the Conakry detail
  location: string           // max 120
  startDate: Date
  endDate: Date
  status: 'Completed' | 'In Progress' | 'Planned' | 'Not Specified'
  description: string        // max 500
  sortOrder: number
  isPublished: boolean
}
```

The page prints `institution — qualification`, then the date, location, and status on one line. Status "Not Specified" is hidden. The description is the paragraph under that line.

### Volunteer experience

```ts
{
  organization: string       // required, max 160
  role: string               // required, max 160
  startDate: Date            // required
  endDate: Date | null
  isCurrent: boolean
  description: string        // max 500
  contributions: string[]    // up to 8, 400 characters each
  sortOrder: number
  isPublished: boolean
}
```

The page shows the organization once, from the first record, then lists every role as a bullet with its dates. All current records use the same organization, The Welcoming Center.

### Work

```ts
{
  title: string              // required, max 120
  slug: string               // required, unique, 3–80 lowercase letters, numbers, hyphens
  summary: string            // required, max 400
  repositoryUrl: string      // required http(s) URL
  liveUrl: string            // optional http(s) URL
  imageUrl: string           // optional site path or http(s) URL
  technologies: string[]     // up to 12, 40 characters each
  highlights: string[]       // up to 6, 240 characters each
  sortOrder: number
  isPublished: boolean
}
```

### Contact message

A contact message stores `name`, `email`, optional `subject`, `message`, and `status` (`New`, `Read`, `Replied`, or `Archived`).

### Visit

A visit stores `visitorId` (32 hex characters), `month` (`YYYY-MM` in UTC), and optional `country` and `city`. The visitor id and month are unique together. The count for a month is the number of distinct browsers, not the number of page views. Country and city are looked up from the public network address on the first visit of the month. A local or private address is stored as blank and shown as Unknown. The network address itself is not stored. The admin page shows the monthly total and the count for each city, and it does not show the visitor id.

The administrator is not a database record. Sign-in compares the submitted email and password with `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `Back-end/.env`. The password must be at least 8 characters. A successful login receives a two-hour cookie. There is only one administrator, and changing the `.env` values requires an API restart before the new password is used.

## API

Public:

- `GET /api/v1/health`
- `GET /api/v1/profile`
- `GET /api/v1/skills`
- `GET /api/v1/experiences`
- `GET /api/v1/education`
- `GET /api/v1/volunteer-experiences`
- `GET /api/v1/works`
- `POST /api/v1/contact` with `name`, `email`, `message`, and optional `subject`. `website` is a honeypot.
- `POST /api/v1/visits` records the current browser for the current UTC month. The body may include `visitorId`, 32 hex characters. The route sets an httpOnly `visitor_id` cookie.

Administrator:

- `POST /api/v1/admin/login`
- `POST /api/v1/admin/logout`
- `GET /api/v1/admin/visits` returns `{ month, count }` rows, newest month first
- `GET /api/v1/admin/messages`
- `GET /api/v1/admin/messages/:id`
- `PATCH /api/v1/admin/messages/:id` with status New, Read, Replied, or Archived

Login sets an httpOnly `admin_token` cookie and a readable `csrf_token` cookie. Logout and status updates require the admin cookie and an `x-csrf-token` header that matches the CSRF cookie. The admin cookies last two hours. The visitor cookie lasts 400 days. In production those cookies are `Secure` and `SameSite=None`. Contact is limited to 8 requests per 15 minutes, visits to 30, and login to 5 in production or 30 otherwise. Tests skip the limits. Request bodies are validated with Zod and rejected when they contain unknown fields. JSON bodies are limited to 32 KB.

## Update workflow

Use this when the text on the page should change. The Professional Experience example below is the same path used for skills, education, volunteer roles, selected work, and the profile.

1. Open `Back-end/src/seed/portfolio.ts`.
2. Find the object in the `experiences` array. Match it by `company` and `position`, for example `RENAPS` and `Analyst Programmer`.
3. Edit the fields you want visitors to see. To change the bullets, replace strings in `responsibilities`. One string is one bullet, and each string must stay within 400 characters.
4. Keep `isCurrent: true` and `endDate: null` for a job that is still going. For a finished job, set `isCurrent: false` and set `endDate` with `utc(year, month)`.
5. From the `Back-end` folder, run `npm run seed`.
6. Reload `http://localhost:5173`. The page requests `/api/v1/experiences` only when it first opens, so a refresh is required before the new bullets appear.

The seed writes with `findOneAndUpdate` and `$set`. It does not append a second copy of the same role.

| Collection | Updated when this stays the same | Removed when it no longer appears in the seed |
| --- | --- | --- |
| Profile | `email` | any other profile email |
| Skill category | `slug` | any other slug |
| Experience | `company` and `position` together | any other company and position pair |
| Education | `institution` and `qualification` together | any other institution and qualification pair |
| Volunteer role | `organization` and `role` together | a role is removed only when its organization is gone from the seed |
| Work | `slug` | any other slug |

Renaming a company, position, institution, or qualification therefore inserts the new record and deletes the old one. Renaming only a volunteer role, while the organization stays The Welcoming Center, inserts the new role and leaves the old role in the database, because volunteer cleanup checks the organization only. Remove that old role from the database or change the organization before seeding if it should disappear.

Contact messages and visit counts are untouched by the seed. The administrator signs in with `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `Back-end/.env`.

About text, capability cards, navigation labels, and the hero technology chips are edited in the frontend files named above. Those changes appear through the Vite dev server and do not need `npm run seed`.
