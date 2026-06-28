import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Home } from '../pages/Home'

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  )
}

describe('Home page', () => {
  it('renders the hero headline words', () => {
    renderHome()
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent(/track/i)
    expect(h1).toHaveTextContent(/every/i)
    expect(h1).toHaveTextContent(/swing/i)
  })

  it('has a primary "get early access" call to action', () => {
    renderHome()
    const ctas = screen.getAllByRole('link', { name: /get early access/i })
    expect(ctas.length).toBeGreaterThan(0)
  })

  it('renders the three pricing plans', () => {
    renderHome()
    const pricing = document.getElementById('pricing')!
    expect(pricing).toBeInTheDocument()
    const region = within(pricing)
    expect(region.getByRole('heading', { name: 'Free' })).toBeInTheDocument()
    expect(region.getByRole('heading', { name: 'Premium' })).toBeInTheDocument()
    expect(region.getByRole('heading', { name: 'Unlimited' })).toBeInTheDocument()
    expect(region.getByText('$12.99')).toBeInTheDocument()
    expect(region.getByText('$134.99')).toBeInTheDocument()
  })

  it('renders the FAQ section with questions', () => {
    renderHome()
    const faq = document.getElementById('faq')!
    expect(within(faq).getByText(/do i need any extra hardware/i)).toBeInTheDocument()
  })

  it('uses a single h1 and has section headings', () => {
    renderHome()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThan(3)
  })
})
