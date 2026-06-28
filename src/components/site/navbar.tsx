import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../../lib/content'
import { Wordmark } from './logo'
import { cn } from '../../lib/cn'

export function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <nav
          aria-label="Primary"
          className="flex h-14 items-center justify-between rounded-full border border-white/10 bg-black/50 pl-5 pr-2.5 backdrop-blur-xl"
        >
          <Link to="/" aria-label="Ballista Tracking home" className="shrink-0">
            <Wordmark />
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/65 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/#early-access"
              className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-white/90 sm:inline-flex"
            >
              join the beta
            </a>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 top-0 z-40 origin-top bg-black/95 px-6 pb-10 pt-24 backdrop-blur-xl transition-all duration-300 md:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <div className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-4 text-2xl font-semibold tracking-tight text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#early-access"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-black"
          >
            join the beta
          </a>
        </div>
      </div>
    </header>
  )
}
