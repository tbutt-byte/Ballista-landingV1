import { Seo } from '../components/site/seo'
import { EarlyAccessForm } from '../components/site/early-access-form'
import { SITE } from '../lib/content'

export function Contact() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <Seo
        title="Contact | Ballista Tracking"
        description="Get in touch with Ballista Tracking or request early access to phone-based baseball swing tracking."
        path="/contact"
      />
      <div className="inline-flex items-center gap-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">contact</span>
      </div>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Get in touch.</h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
        Players, parents, coaches, academies, and evaluators — tell us a bit about you and request
        early access. You can also email us directly at{' '}
        <a href={`mailto:${SITE.email}`} className="text-white underline underline-offset-4">
          {SITE.email}
        </a>
        .
      </p>

      <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9">
        <EarlyAccessForm />
      </div>
    </main>
  )
}
