import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

const storageKey = 'portfolio-theme'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(storageKey, theme)
  }, [theme])

  const nextIsDark = theme === 'light'

  return (
    <button
      type="button"
      className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white hover:bg-white/10"
      aria-pressed={theme === 'dark'}
      aria-label={nextIsDark ? 'Switch to dark mode' : 'Switch to light mode'}
      onClick={() => setTheme(nextIsDark ? 'dark' : 'light')}
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
    </button>
  )
}
