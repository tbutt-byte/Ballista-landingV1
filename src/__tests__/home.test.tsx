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
  it('renders the required hero headline', () => {
    renderHome()
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveAccessibleName('Turn every swing into measurable progress.')
  })

  it('has a primary "join the beta" call to action', () => {
    renderHome()
    const ctas = screen.getAllByRole('link', { name: /join the beta/i })
    expect(ctas.length).toBeGreaterThan(0)
  })

  it('renders the real trial pricing', () => {
    renderHome()
    const pricing = document.getElementById('pricing')!
    expect(pricing).toBeInTheDocument()
    const region = within(pricing)
    expect(region.getByText('7-day free trial')).toBeInTheDocument()
    expect(region.getByText('$9.99')).toBeInTheDocument()
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
