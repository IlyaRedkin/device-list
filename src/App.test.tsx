import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('initial render', () => {
  render(<App />)
  const linkElement = screen.getByText(/Add Gateway Device/i)
  expect(linkElement).toBeInTheDocument()
})
