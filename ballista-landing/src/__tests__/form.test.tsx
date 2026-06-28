import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EarlyAccessForm } from '../components/site/early-access-form'
import { validateEarlyAccess } from '../lib/earlyAccess'

describe('validateEarlyAccess', () => {
  it('flags missing name, email, and role', () => {
    const errors = validateEarlyAccess({})
    expect(errors.name).toBeTruthy()
    expect(errors.email).toBeTruthy()
    expect(errors.role).toBeTruthy()
  })

  it('rejects an invalid email', () => {
    const errors = validateEarlyAccess({ name: 'Sam', email: 'nope', role: 'player' })
    expect(errors.email).toBeTruthy()
    expect(errors.name).toBeUndefined()
  })

  it('passes with valid input', () => {
    const errors = validateEarlyAccess({ name: 'Sam', email: 'sam@example.com', role: 'coach' })
    expect(Object.keys(errors)).toHaveLength(0)
  })
})

describe('EarlyAccessForm', () => {
  it('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup()
    render(<EarlyAccessForm />)
    await user.click(screen.getByRole('button', { name: /get early access/i }))
    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument()
    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument()
  })

  it('shows the not-connected message after a valid submit when no backend is configured', async () => {
    const user = userEvent.setup()
    render(<EarlyAccessForm />)
    await user.type(screen.getByLabelText(/name/i), 'Sam Player')
    await user.type(screen.getByLabelText(/email/i), 'sam@example.com')
    await user.selectOptions(screen.getByLabelText(/i am a/i), 'player')
    await user.click(screen.getByRole('button', { name: /get early access/i }))
    expect(await screen.findByText(/aren't connected yet/i)).toBeInTheDocument()
  })
})
