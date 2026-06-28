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

describe('Interactive demo section', () => {
  it('renders the demo video, controls, overlay toggles, and step indicator', () => {
    renderHome()
    const demo = document.getElementById('demo')!
    const region = within(demo)

    const video = demo.querySelector('video')
    expect(video).toBeInTheDocument()
    expect(video).toHaveAttribute('src', '/assets/demo-swing.mp4')

    expect(region.getByRole('button', { name: /play demo swing/i })).toBeInTheDocument()
    expect(region.getByRole('button', { name: /swing path/i })).toBeInTheDocument()
    expect(region.getByRole('list', { name: /demo playback phase/i })).toBeInTheDocument()
    expect(region.getAllByText(/not a live in-browser analysis/i).length).toBeGreaterThan(0)
  })

  it('never claims live analysis or a native app', () => {
    renderHome()
    const text = screen.getByText(/try the swing analysis flow/i).closest('section')!.textContent!
    expect(text.toLowerCase()).not.toContain('live analysis')
    expect(text.toLowerCase()).not.toContain('real-time')
  })
})
