import { isSupabaseConfigured, supabase } from './supabase'

export type Role = 'player' | 'parent' | 'coach' | 'academy' | 'other'

export type EarlyAccessInput = {
  name: string
  email: string
  role: Role
  message?: string
}

export type SubmitResult =
  | { status: 'saved' }
  | { status: 'not-configured' }
  | { status: 'error'; message: string }

export type FieldErrors = Partial<Record<'name' | 'email' | 'role', string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEarlyAccess(input: Partial<EarlyAccessInput>): FieldErrors {
  const errors: FieldErrors = {}
  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Please enter your name.'
  }
  if (!input.email || !EMAIL_RE.test(input.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  if (!input.role) {
    errors.role = 'Select the option that best describes you.'
  }
  return errors
}

/**
 * Isolated submit handler. When Supabase is configured it performs a real
 * insert; otherwise it returns `not-configured` so the UI can be honest rather
 * than faking a saved state.
 */
export async function submitEarlyAccess(input: EarlyAccessInput): Promise<SubmitResult> {
  if (!isSupabaseConfigured || !supabase) {
    return { status: 'not-configured' }
  }
  try {
    const { error } = await supabase.from('early_access').insert({
      name: input.name.trim(),
      email: input.email.trim(),
      role: input.role,
      message: input.message?.trim() || null,
      source: 'website',
    })
    if (error) return { status: 'error', message: error.message }
    return { status: 'saved' }
  } catch (err) {
    return { status: 'error', message: err instanceof Error ? err.message : 'Something went wrong.' }
  }
}
