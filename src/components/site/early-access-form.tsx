import { useState, type FormEvent } from 'react'
import { Check, Loader2 } from 'lucide-react'
import {
  submitEarlyAccess,
  validateEarlyAccess,
  type FieldErrors,
  type Role,
} from '../../lib/earlyAccess'
import { SITE } from '../../lib/content'
import { cn } from '../../lib/cn'

const ROLES: { value: Role; label: string }[] = [
  { value: 'player', label: 'Player' },
  { value: 'parent', label: 'Parent' },
  { value: 'coach', label: 'Coach' },
  { value: 'academy', label: 'Academy' },
  { value: 'other', label: 'Other' },
]

type Status = 'idle' | 'submitting' | 'saved' | 'not-configured' | 'error'

const fieldClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/30'

export function EarlyAccessForm() {
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      role: (form.elements.namedItem('role') as HTMLSelectElement).value as Role,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    const validation = validateEarlyAccess(data)
    setErrors(validation)
    if (Object.keys(validation).length > 0) {
      const first = document.getElementById(`ea-${Object.keys(validation)[0]}`)
      first?.focus()
      return
    }

    setStatus('submitting')
    setServerError('')
    const result = await submitEarlyAccess(data as { name: string; email: string; role: Role; message: string })
    if (result.status === 'saved') {
      setStatus('saved')
      form.reset()
    } else if (result.status === 'not-configured') {
      setStatus('not-configured')
    } else {
      setStatus('error')
      setServerError(result.message)
    }
  }

  if (status === 'saved') {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">You're on the list.</h3>
        <p className="mt-2 text-sm text-white/60">
          Thanks for your interest in Ballista. We'll reach out as early access opens up.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ea-name" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/60">
            Name
          </label>
          <input
            id="ea-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'ea-name-error' : undefined}
            className={cn(fieldClass, errors.name && 'border-white/50')}
          />
          {errors.name && (
            <p id="ea-name-error" className="mt-1.5 text-xs text-white/70">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="ea-email" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/60">
            Email
          </label>
          <input
            id="ea-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@email.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'ea-email-error' : undefined}
            className={cn(fieldClass, errors.email && 'border-white/50')}
          />
          {errors.email && (
            <p id="ea-email-error" className="mt-1.5 text-xs text-white/70">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="ea-role" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/60">
          I am a
        </label>
        <select
          id="ea-role"
          name="role"
          defaultValue=""
          aria-invalid={Boolean(errors.role)}
          aria-describedby={errors.role ? 'ea-role-error' : undefined}
          className={cn(fieldClass, 'appearance-none', errors.role && 'border-white/50')}
        >
          <option value="" disabled>
            Select one
          </option>
          {ROLES.map((r) => (
            <option key={r.value} value={r.value} className="bg-black text-white">
              {r.label}
            </option>
          ))}
        </select>
        {errors.role && (
          <p id="ea-role-error" className="mt-1.5 text-xs text-white/70">
            {errors.role}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="ea-message" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/60">
          Message <span className="text-white/35">(optional)</span>
        </label>
        <textarea
          id="ea-message"
          name="message"
          rows={3}
          placeholder="Tell us how you'd use Ballista."
          className={cn(fieldClass, 'resize-y')}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-white/90 disabled:opacity-70"
      >
        {status === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === 'submitting' ? 'Sending…' : 'join the beta'}
      </button>

      {status === 'not-configured' && (
        <p className="text-center text-sm text-white/60" role="status">
          Submissions aren't connected yet — email us at{' '}
          <a href={`mailto:${SITE.email}`} className="text-white underline underline-offset-4">
            {SITE.email}
          </a>{' '}
          and we'll add you to early access.
        </p>
      )}
      {status === 'error' && (
        <p className="text-center text-sm text-white/70" role="alert">
          Something went wrong{serverError ? `: ${serverError}` : ''}. Please try again or email{' '}
          <a href={`mailto:${SITE.email}`} className="text-white underline underline-offset-4">
            {SITE.email}
          </a>
          .
        </p>
      )}
      <p className="text-center text-xs text-white/40">
        No spam. We don't sell or rent your information.
      </p>
    </form>
  )
}
