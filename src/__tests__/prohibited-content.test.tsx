import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Home } from '../pages/Home'

const PROHIBITED = [
  'trusted by',
  'mlb-grade',
  'revolutionary',
  'guaranteed',
  '10,000 swings',
  'thousands of players',
  'pro team',
  'radar-level',
  'instant improvement',
]

describe('prohibited content', () => {
  it('never renders fabricated proof or overclaiming language', () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    const text = container.textContent?.toLowerCase() ?? ''
    for (const phrase of PROHIBITED) {
      expect(text).not.toContain(phrase)
    }
  })
})
