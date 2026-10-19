import { Menu, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { navItems } from '../data/content.ts'
import { ThemeToggle } from './ThemeToggle.tsx'

export function Header() {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setOpen(false)
      menuButtonRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <a href="#home" className="min-w-0">
          <span className="block text-base font-bold leading-tight sm:text-lg">
            Mamadou Moussa <span className="text-accent">BALDE</span>
          </span>
        </a>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-slate-100 hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white hover:bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>
      <nav id={menuId} className="border-t border-white/10 px-4 py-3 lg:hidden" aria-label="Mobile" hidden={!open}>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block rounded-md px-3 py-3 text-sm font-medium text-white hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
