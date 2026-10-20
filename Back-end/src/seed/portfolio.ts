import mongoose from 'mongoose'
import {
  Education,
  Experience,
  Profile,
  SkillCategory,
  VolunteerExperience,
  Work,
} from '../models/index.js'

const utc = (year: number, month: number) => new Date(Date.UTC(year, month - 1, 1))

const profile = {
  fullName: 'Mamadou Moussa BALDE',
  headline: 'Oracle Developer | Full-Stack MERN | AI Native Software Engineer',
  tagline: 'Better Code, Better Solutions.',
  summary:
    'I modernize enterprise applications and build reliable software across Oracle technologies, relational databases, and modern full-stack development. I combine deep enterprise application experience with React, Node.js, TypeScript, REST APIs, and software engineering practices to deliver maintainable solutions.',
  location: 'Philadelphia, Pennsylvania',
  email: 'lebaldem2@gmail.com',
  portraitUrl: '/images/profile.jpg',
  resumeUrl:
    'https://drive.google.com/file/d/1rG-ISGIcCkcbJP1l-nsGz_ydsryQkqGE/view?usp=sharing',
  socialLinks: {
    github: 'https://github.com/baldemoussa',
    linkedin: 'https://www.linkedin.com/in/2mb/',
  },
  isPublished: true,
}

const categories = [
  {
    name: 'Oracle & Enterprise Technologies',
    slug: 'oracle-enterprise',
    icon: 'database',
    sortOrder: 0,
    isPublished: true,
    skills: [
      'Oracle Forms & Reports (6i–12c)',
      'Oracle Database',
      'SQL',
      'PL/SQL',
      'Oracle WebLogic Server',
      'Oracle APEX',
    ].map((name, sortOrder) => ({ name, sortOrder })),
  },
  {
    name: 'Full-Stack MERN',
    slug: 'full-stack-mern',
    icon: 'code',
    sortOrder: 1,
    isPublished: true,
    skills: [
      'JavaScript',
      'TypeScript',
      'React',
      'Node.js',
      'Express.js',
      'HTML5',
      'CSS3',
      'Java',
      'RESTful APIs',
    ].map((name, sortOrder) => ({ name, sortOrder })),
  },
  {
    name: 'Databases',
    slug: 'databases',
    icon: 'server',
    sortOrder: 2,
    isPublished: true,
    skills: [
      'PostgreSQL',
      'MongoDB',
      'Microsoft SQL Server',
      'MySQL',
      'Relational database design',
      'SQL optimization',
    ].map((name, sortOrder) => ({ name, sortOrder })),
  },
  {
    name: 'Engineering, Testing, Delivery & AI',
    slug: 'engineering-delivery',
    icon: 'wrench',
    sortOrder: 3,
    isPublished: true,
    skills: [
      'Unit and integration testing',
      'Test automation',
      'Code reviews',
      'Refactoring',
      'Git',
      'GitHub Actions',
      'TortoiseSVN',
      'Agile/Scrum',
      'Technical documentation',
      'Secure coding',
      'Netlify',
      'Render',
      'JIRA',
      'Figma',
      'Prompt engineering',
      'Microsoft Copilot',
      'Claude Code',
      'Cursor AI',
      'Codex',
    ].map((name, sortOrder) => ({ name, sortOrder })),
  },
]

const experiences = [
  {
    company: 'RENAPS',
    position: 'Analyst Programmer',
    location: 'United States',
    employmentType: 'Full-time',
    startDate: utc(2024, 4),
    endDate: null,
    isCurrent: true,
    responsibilities: [
      'Modernized multiple enterprise applications by migrating legacy Oracle Forms & Reports (6i–12c) systems to React, Node.js, Java, and PostgreSQL, improving application scalability, maintainability, and long-term system performance.',
      'Increased database performance by an estimated 40% by optimizing complex PL/SQL packages, stored procedures, and advanced SQL queries that eliminated bottlenecks and strengthened data integrity.',
      'Accelerated legacy system modernization by leveraging AI-assisted development tools, reducing code analysis and debugging time by approximately 50% while improving development efficiency and code quality.',
      'Maintained a 99%+ success deployment rate by executing comprehensive unit, integration, regression, and user acceptance testing while managing source code across SVN and GitHub version control environments.',
      'Collaborated with cross-functional development teams to translate complex business requirements into scalable enterprise software solutions, reducing technical debt and improving long-term application reliability.',
    ],
    achievements: [],
    technologies: ['Oracle Forms & Reports', 'PL/SQL', 'SQL', 'React', 'Node.js', 'Java', 'PostgreSQL', 'SVN', 'GitHub'],
    sortOrder: 0,
    isPublished: true,
  },
  {
    company: 'AFENET',
    position: 'IT Systems Administrator & Data Analyst',
    location: 'Conakry, Guinea',
    employmentType: 'Full-time',
    startDate: utc(2020, 9),
    endDate: utc(2023, 9),
    isCurrent: false,
    responsibilities: [
      'Mission-Critical System Availability: Administered and optimized the national DHIS2 epidemiological surveillance platform in collaboration with Ministry of Health teams (ANSS & BSD), ensuring uninterrupted real-time tracking during critical multi-outbreak responses.',
      'Platform Customization & Analytics: Configured custom DHIS2 parameters, data entry forms, and surveillance dashboards, streamlining data collection and enabling health officials to make faster, data-driven decisions.',
      'Large-Scale Capacity Building: Authored training curricula and led workforce development programs for 100+ epidemiologists and 2,000+ national health agents, driving rapid adoption and ensuring high data entry accuracy nationwide.',
      'Governance & Standard Operating Procedures: Standardized IT operations by drafting official monitoring server administration manuals and formal management plans, securing data integrity and long-term system sustainability.',
    ],
    achievements: [],
    technologies: ['DHIS2'],
    sortOrder: 1,
    isPublished: true,
  },
  {
    company: 'ETI S.A.',
    position: 'Senior Application Design & Development Engineer',
    location: 'Conakry, Guinea',
    employmentType: 'Full-time',
    startDate: utc(2011, 1),
    endDate: utc(2020, 8),
    isCurrent: false,
    responsibilities: [
      'Customer Billing System (Water & Electricity Utility): Engineered a high-transaction Oracle Forms & Reports billing system for the national water/electricity utility, automating invoicing and optimizing revenue collection across nationwide customer accounts.',
      'National Civil Service Career System: Spearheaded the end-to-end implementation of a centralized HR platform, digitizing employee lifecycles and career records for thousands of public servants while establishing core engineering standards across junior dev teams.',
      'National Tax Department IT System Overhaul: Modernized core legacy software for the National Tax Department, leveraging advanced PL/SQL optimization to improve query execution speeds by 30%+ and increase data processing reliability.',
      'Civil Servants and Retirees Payroll Management System Redesign: Re-architected compensation and pension management applications, integrating robust PL/SQL packages and database triggers to ensure error-free, high-volume monthly salary distribution.',
      'High-Availability Enterprise Architecture: Maintained mission-critical public sector applications on Oracle Databases, Oracle Forms & Reports, and WebLogic Server, achieving 99.9% uptime and processing millions of database records efficiently.',
    ],
    achievements: [],
    technologies: ['Oracle Forms & Reports', 'PL/SQL', 'Oracle Database', 'Oracle WebLogic Server'],
    sortOrder: 2,
    isPublished: true,
  },
  {
    company: 'Université Mercure International',
    position: 'Web Technologies Instructor',
    location: 'Conakry, Guinea',
    employmentType: 'Other',
    startDate: utc(2011, 9),
    endDate: utc(2017, 2),
    isCurrent: false,
    responsibilities: [
      'Delivered 8 to 12 hours of weekly technical instruction to final-year undergraduate students (Licence 3), teaching cohort classes of 20–30 students per year in full-stack web development (HTML5, CSS3, JavaScript, PHP).',
      'Taught relational database management using MySQL DBMS, training students on database design, relational schema architecture, and SQL query optimization.',
      'Mentored students through the complete Software Development Life Cycle (SDLC), delivering hands-on guidance on project requirements analysis, architectural design, web application development, and final deployment strategies.',
    ],
    achievements: [],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
    sortOrder: 3,
    isPublished: true,
  },
  {
    company: 'ETI S.A.',
    position: 'Software Development Intern, Oracle Fusion Middleware',
    location: 'Guinea',
    employmentType: 'Internship',
    startDate: utc(2010, 8),
    endDate: utc(2010, 12),
    isCurrent: false,
    summary: 'Internship in software development using Oracle Fusion Middleware.',
    responsibilities: [],
    achievements: [],
    technologies: ['Oracle Fusion Middleware'],
    sortOrder: 4,
    isPublished: true,
  },
  {
    company: 'Rapidass',
    position: 'Web Application Development Intern',
    location: 'Conakry, Guinea',
    employmentType: 'Internship',
    startDate: utc(2010, 1),
    endDate: utc(2010, 7),
    isCurrent: false,
    responsibilities: [
      'Built web portal applications with HTML, CSS, JavaScript, PHP, and MySQL.',
      'Handled web server administration, maintenance, and content management.',
      'Applied web security practices to protect application data.',
    ],
    achievements: [],
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    sortOrder: 5,
    isPublished: true,
  },
]

const education = [
  {
    institution: 'Per Scholas',
    qualification: 'AI native Software Engineering Training',
    location: 'Philadelphia, PA',
    endDate: utc(2026, 10),
    status: 'Completed',
    sortOrder: 0,
    isPublished: true,
  },
  {
    institution: 'University of Conakry',
    qualification: 'Bachelor in Computer Science',
    fieldOfStudy: 'Computer Science Applied to Business Management',
    location: 'Conakry, Guinea',
    status: 'Completed',
    description:
      'Gamal Abdel Nasser University of Conakry, 2006–2010. Diplôme de Maîtrise (2010) in Computer Science Applied to Business Management. World Education Services evaluation (October 9, 2024): U.S. equivalency of a bachelor’s degree, 133 semester credits, GPA 3.92.',
    sortOrder: 1,
    isPublished: true,
  },
]

const volunteer = [
  {
    organization: 'The Welcoming Center',
    role: 'Digital Bridge Program Facilitator',
    startDate: utc(2025, 9),
    endDate: utc(2026, 6),
    isCurrent: false,
    sortOrder: 0,
    isPublished: true,
    contributions: [],
  },
  {
    organization: 'The Welcoming Center',
    role: 'Immigrant Leadership Institute Participant',
    startDate: utc(2024, 2),
    endDate: utc(2025, 4),
    isCurrent: false,
    sortOrder: 1,
    isPublished: true,
    contributions: [],
  },
  {
    organization: 'The Welcoming Center',
    role: 'Digital Skills Workshop Assistant Instructor',
    startDate: utc(2024, 2),
    endDate: utc(2024, 4),
    isCurrent: false,
    sortOrder: 2,
    isPublished: true,
    contributions: [],
  },
]

const works = [
  {
    title: 'Pro-Tasker',
    slug: 'pro-tasker',
    imageUrl: '/images/works/pro-tasker.png',
    summary:
      'A shared project board. People register, create projects, invite collaborators, and move tasks across To Do, In Progress, Done, and Hold.',
    repositoryUrl: 'https://github.com/baldemoussa/Full-Stack-MERN-Application-Pro-Tasker',
    liveUrl: 'https://full-stack-mern-application-pro-tasker-1.onrender.com',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Express', 'MongoDB', 'JWT'],
    highlights: [
      'The board supports search, filters, sort, due dates, priority, comments, and drag and drop.',
      'Project analytics and a light or night theme are included.',
      'The API checks whether the caller is the owner, an editor, or a viewer.',
    ],
    sortOrder: 0,
    isPublished: true,
  },
  {
    title: 'AI Cooking Assistant',
    slug: 'ai-cooking-assistant',
    imageUrl: '/images/works/ai-cooking-assistant.png',
    summary: 'A React page that drafts a recipe from the ingredients already on hand.',
    repositoryUrl: 'https://github.com/baldemoussa/AI-cooking-assistant',
    liveUrl: 'https://ai-cooking-assistant-c393.onrender.com/',
    technologies: ['React', 'Vite', 'Gemini', 'Groq'],
    highlights: [
      'The pantry accepts ingredients, a mood, a cuisine, and a note.',
      'The recipe can be written with Gemini or Groq.',
    ],
    sortOrder: 1,
    isPublished: true,
  },
  {
    title: 'REST Countries',
    slug: 'rest-countries',
    imageUrl: '/images/works/rest-countries.png',
    summary:
      'A React page that lists countries from the REST Countries API, with search, a region filter, and a country detail view.',
    repositoryUrl: 'https://github.com/baldemoussa/React-REST-Countries-API',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    highlights: [
      'Each card shows the flag, name, population, region, and capital.',
      'The detail view includes neighbors that are also in the loaded list.',
      'The page has light and dark mode.',
    ],
    sortOrder: 2,
    isPublished: true,
  },
  {
    title: 'IP Address Tracker',
    slug: 'ip-address-tracker',
    imageUrl: '/images/works/ip-address-tracker.png',
    summary: 'A one-page tracker that looks up an IP address, a domain, or an email and shows the result on a map.',
    repositoryUrl: 'https://github.com/baldemoussa/IP-Address-Tracker',
    technologies: ['TypeScript', 'Leaflet', 'OpenStreetMap'],
    highlights: [
      'The result card shows the IP address, location, timezone, and ISP.',
      'The map uses Leaflet with OpenStreetMap tiles.',
    ],
    sortOrder: 3,
    isPublished: true,
  },
  {
    title: 'Recipe Discovery',
    slug: 'recipe-discovery',
    imageUrl: '/images/works/recipe-discovery.png',
    summary: 'A React and TypeScript app that browses recipes from TheMealDB.',
    repositoryUrl: 'https://github.com/baldemoussa/React-Recipe-Discovery-App',
    technologies: ['React', 'TypeScript', 'Vite'],
    highlights: [
      'Home lists meal categories, and a category opens its recipes.',
      'A recipe page shows the photo, ingredients, instructions, and a video when one is available.',
      'Favorites are saved in the browser.',
    ],
    sortOrder: 4,
    isPublished: true,
  },
  {
    title: 'Task Management App',
    slug: 'task-management-app',
    imageUrl: '/images/works/task-management-app.png',
    summary: 'A single page that stores a task list in the browser.',
    repositoryUrl: 'https://github.com/baldemoussa/Task_Management_App',
    liveUrl: 'https://baldemoussa.github.io/Task_Management_App/',
    technologies: ['JavaScript', 'Bootstrap'],
    highlights: [
      'Each task has a name, category, deadline, and status.',
      'Open or in-progress tasks with a past deadline are marked Overdue.',
      'The list remains after the page reloads.',
    ],
    sortOrder: 5,
    isPublished: true,
  },
  {
    title: 'Digital Bookshelf API',
    slug: 'digital-bookshelf-api',
    imageUrl: '/images/works/digital-bookshelf-api.png',
    summary: 'An Express and MongoDB API for books, with create, read, update, and delete routes.',
    repositoryUrl: 'https://github.com/baldemoussa/Digital-Bookshelf-API',
    technologies: ['Express', 'MongoDB', 'Mongoose'],
    highlights: [
      'A book requires a title, author, and unique ISBN.',
      'Published date is optional, and stock defaults to available.',
    ],
    sortOrder: 6,
    isPublished: true,
  },
  {
    title: 'Movie Finder API',
    slug: 'movie-finder-api',
    imageUrl: '/images/works/movie-finder-api.png',
    summary: 'An Express API that forwards a movie title search to OMDB and returns the matches.',
    repositoryUrl: 'https://github.com/baldemoussa/Movie-Finder-API',
    technologies: ['Express', 'OMDB'],
    highlights: ['A search without a title is rejected before the lookup runs.'],
    sortOrder: 7,
    isPublished: true,
  },
]

async function upsertBy<T extends Record<string, unknown>>(
  model: mongoose.Model<T>,
  filter: Record<string, unknown>,
  data: Record<string, unknown>,
) {
  await model.findOneAndUpdate(filter, { $set: data }, { upsert: true, runValidators: true })
}

export async function seedPortfolio() {
  await upsertBy(Profile, { email: profile.email }, profile)
  await Profile.deleteMany({ email: { $ne: profile.email } })

  for (const category of categories) {
    await upsertBy(SkillCategory, { slug: category.slug }, category)
  }
  await SkillCategory.deleteMany({ slug: { $nin: categories.map((category) => category.slug) } })

  for (const entry of experiences) {
    await upsertBy(Experience, { company: entry.company, position: entry.position }, entry)
  }
  await Experience.deleteMany({
    $nor: experiences.map((entry) => ({ company: entry.company, position: entry.position })),
  })

  for (const entry of education) {
    await upsertBy(
      Education,
      { institution: entry.institution, qualification: entry.qualification },
      entry,
    )
  }
  await Education.deleteMany({
    $nor: education.map((entry) => ({
      institution: entry.institution,
      qualification: entry.qualification,
    })),
  })

  for (const entry of volunteer) {
    await upsertBy(
      VolunteerExperience,
      { organization: entry.organization, role: entry.role },
      entry,
    )
  }
  await VolunteerExperience.deleteMany({
    organization: { $nin: volunteer.map((entry) => entry.organization) },
  })

  for (const entry of works) {
    await upsertBy(Work, { slug: entry.slug }, entry)
  }
  await Work.deleteMany({ slug: { $nin: works.map((entry) => entry.slug) } })

  await removeLegacyCollections()
  console.log('Portfolio content is seeded.')
}

async function removeLegacyCollections() {
  const database = mongoose.connection.db
  if (!database) return
  const names = new Set(
    (await database.listCollections().toArray()).map((collection) => collection.name),
  )
  for (const name of ['projects', 'skills', 'timelineitems', 'users', 'messages', 'adminusers']) {
    if (names.has(name)) await database.dropCollection(name)
  }
}
