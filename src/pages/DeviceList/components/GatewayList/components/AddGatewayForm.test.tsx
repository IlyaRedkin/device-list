import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import AddGatewayForm from './AddGatewayForm'

beforeEach(() => render(<AddGatewayForm onChange={() => {}} />))

const getData = (): {
  input: HTMLInputElement
  errorText: HTMLElement
} => {
  const input = screen.getByLabelText('ipv4') as unknown as HTMLInputElement
  const errorText = screen.getByLabelText('input-error-ipv4')
  return {
    input,
    errorText
  }
}

test('AddGatewayForm: initial empty ipv4', () => {
  const { input, errorText } = getData()

  expect(input.value).toBe('')
  expect(errorText).toHaveTextContent('')
})

test('AddGatewayForm: valid ip v4', () => {
  const { input, errorText } = getData()

  fireEvent.change(input, { target: { value: '1.1.1.1' } })
  expect(input.value).toBe('1.1.1.1')
  expect(errorText).toHaveTextContent('')
})

test('AddGatewayForm: invalid ip v4', () => {
  const { input, errorText } = getData()

  fireEvent.change(input, { target: { value: '1' } })
  expect(input.value).toBe('1')
  expect(errorText).toHaveTextContent('Please use ip v4')
})
