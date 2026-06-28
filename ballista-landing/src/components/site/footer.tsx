import { Link } from 'react-router-dom'
import { SITE, NAV_LINKS } from '../../lib/content'
import { Wordmark } from './logo'

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="min-w-0 sm:col-span-2 lg:col-span-2">
            <Link to="/" aria-label="Ballista Tracking home">
              <Wordmark />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/55">{SITE.tagline}</p>
          </div>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">Company</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link to="/contact" className="text-sm text-white/60 transition-colors hover:text-white">
                  contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-white/60 transition-colors hover:text-white">
                  privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-white/60 transition-colors hover:text-white">
                  terms
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Ballista Tracking. All rights reserved.</span>
          <span>Toronto, Canada</span>
        </div>
      </div>
    </footer>
  )
}
