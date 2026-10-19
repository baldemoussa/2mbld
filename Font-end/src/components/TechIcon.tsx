import type { ReactElement } from 'react'

export const featuredTechnologies = [
  'Oracle',
  'PostgreSQL',
  'MongoDB',
  'React',
  'Node.js',
  'TypeScript',
  'JavaScript',
  'Java',
]

type IconProps = { className?: string }

const marks: Record<string, (props: IconProps) => ReactElement> = {
  oracle: OracleIcon,
  postgresql: PostgresIcon,
  mongodb: MongoIcon,
  react: ReactIcon,
  node: NodeIcon,
  typescript: LetterIcon('TS', '#3178C6', '#FFFFFF'),
  javascript: LetterIcon('JS', '#F7DF1E', '#1A1A1A'),
  java: JavaIcon,
  express: LetterIcon('Ex', '#111827', '#FFFFFF'),
  html: LetterIcon('5', '#E34F26', '#FFFFFF'),
  css: LetterIcon('3', '#1572B6', '#FFFFFF'),
  tailwind: TailwindIcon,
  git: GitIcon,
  sql: SqlIcon,
  mysql: LetterIcon('My', '#00758F', '#FFFFFF'),
  sqlserver: LetterIcon('SQL', '#CC2927', '#FFFFFF'),
  vite: ViteIcon,
  bootstrap: LetterIcon('B', '#7952B3', '#FFFFFF'),
  figma: FigmaIcon,
}

export function TechIcon({ name, className = 'h-5 w-5' }: { name: string; className?: string }) {
  const key = matchTech(name)
  if (!key) return null
  const Icon = marks[key]
  return (
    <span className={`inline-flex shrink-0 ${className}`} aria-hidden="true">
      <Icon className="h-full w-full" />
    </span>
  )
}

function matchTech(name: string) {
  const value = name.toLowerCase()
  if (value.includes('oracle')) return 'oracle'
  if (value.includes('postgres')) return 'postgresql'
  if (value.includes('mongo')) return 'mongodb'
  if (value.includes('typescript')) return 'typescript'
  if (value.includes('javascript')) return 'javascript'
  if (value.includes('react')) return 'react'
  if (value.includes('node')) return 'node'
  if (value.includes('express')) return 'express'
  if (value.includes('tailwind')) return 'tailwind'
  if (value.includes('html')) return 'html'
  if (value.includes('css')) return 'css'
  if (value.includes('vite')) return 'vite'
  if (value.includes('bootstrap')) return 'bootstrap'
  if (value.includes('mysql')) return 'mysql'
  if (value.includes('sql server')) return 'sqlserver'
  if (value === 'sql' || value.includes('pl/sql')) return 'sql'
  if (value === 'java' || value.startsWith('java ')) return 'java'
  if (value === 'git' || value.includes('github')) return 'git'
  if (value.includes('figma')) return 'figma'
  return null
}

function LetterIcon(letters: string, background: string, color: string) {
  return function Mark({ className }: IconProps) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <rect width="24" height="24" rx="5" fill={background} />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fill={color}
          fontSize={letters.length > 2 ? 7 : 9}
          fontFamily="Manrope, ui-sans-serif, sans-serif"
          fontWeight="700"
        >
          {letters}
        </text>
      </svg>
    )
  }
}

function FigmaIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <circle cx="8.2" cy="5.2" r="2.7" fill="#F24E1E" />
      <circle cx="14.6" cy="5.2" r="2.7" fill="#FF7262" />
      <circle cx="8.2" cy="11.4" r="2.7" fill="#A259FF" />
      <circle cx="14.6" cy="11.4" r="2.7" fill="#1ABCFE" />
      <circle cx="8.2" cy="17.6" r="2.7" fill="#0ACF83" />
    </svg>
  )
}

function OracleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect width="24" height="24" rx="5" fill="#C74634" />
      <circle cx="12" cy="12" r="5.5" fill="none" stroke="#FFFFFF" strokeWidth="2.2" />
    </svg>
  )
}

function ReactIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.3" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(120 12 12)" />
    </svg>
  )
}

function NodeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M12 2.2 20.8 7.2v9.6L12 21.8 3.2 16.8V7.2Z" fill="#339933" />
      <text
        x="12"
        y="15.5"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="9"
        fontFamily="Manrope, ui-sans-serif, sans-serif"
        fontWeight="700"
      >
        N
      </text>
    </svg>
  )
}

function MongoIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M12 2c1.8 3.4 4.2 5.6 4.2 9.4A4.2 4.2 0 1 1 7.8 11.4C7.8 7.6 10.2 5.4 12 2Z" fill="#47A248" />
      <path d="M12 21.5v-5.2" stroke="#47A248" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function PostgresIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect width="24" height="24" rx="5" fill="#336791" />
      <ellipse cx="12" cy="13.5" rx="5.2" ry="4.2" fill="#FFFFFF" />
      <circle cx="9.4" cy="12.6" r="0.8" fill="#336791" />
      <path d="M15.6 12.2c1.6.2 2.6 1 2.6 2.2" fill="none" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 9.2c.2-2 .8-3.2 1.6-4" fill="none" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function JavaIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M7 9h8.2v5.2a3.4 3.4 0 0 1-3.4 3.4H10.4A3.4 3.4 0 0 1 7 14.2V9Z" fill="#5382A1" />
      <path d="M15.2 10.2h1.8a2 2 0 0 1 0 4h-1.8" fill="none" stroke="#5382A1" strokeWidth="1.6" />
      <path d="M9.2 6.2c.5.7.5 1.3 0 2M12 5.6c.5.7.5 1.3 0 2" fill="none" stroke="#E76F00" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function SqlIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <ellipse cx="12" cy="7" rx="7" ry="3" fill="#0B1F36" />
      <path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7" fill="#168BFF" />
      <path d="M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" fill="#0B1F36" />
    </svg>
  )
}

function TailwindIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M12 6c-2.2 0-3.6 1.1-4.2 3.3.8-1.1 1.8-1.5 3-1.2 0.7 0.2 1.2 0.7 1.8 1.3C13.6 10.6 14.8 12 17.4 12c2.2 0 3.6-1.1 4.2-3.3-.8 1.1-1.8 1.5-3 1.2-.7-.2-1.2-.7-1.8-1.3C15.8 7.4 14.6 6 12 6Zm-5.4 6c-2.2 0-3.6 1.1-4.2 3.3.8-1.1 1.8-1.5 3-1.2.7.2 1.2.7 1.8 1.3 1 1.2 2.2 2.6 4.8 2.6 2.2 0 3.6-1.1 4.2-3.3-.8 1.1-1.8 1.5-3 1.2-.7-.2-1.2-.7-1.8-1.3-1-1.2-2.2-2.6-4.8-2.6Z"
        fill="#06B6D4"
      />
    </svg>
  )
}

function GitIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="12" r="10" fill="#F05032" />
      <circle cx="12" cy="7" r="1.5" fill="#FFFFFF" />
      <circle cx="8.2" cy="15" r="1.5" fill="#FFFFFF" />
      <circle cx="15.2" cy="14" r="1.5" fill="#FFFFFF" />
      <path d="M12 8.5v4.2L8.8 14.2M12 12.2l2.6 1.2" stroke="#FFFFFF" strokeWidth="1.2" />
    </svg>
  )
}

function ViteIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M12.8 2 4 5.2 5.6 18.2 12.8 22 20 18.2 21.6 5.2 12.8 2Z" fill="#646CFF" />
      <path d="M16.8 7.2 9.2 8.4l.6 6.6 3.2 1.6 3.6-1.8.6-7.6Z" fill="#FFD62E" />
    </svg>
  )
}
