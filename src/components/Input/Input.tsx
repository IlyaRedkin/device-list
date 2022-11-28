import React, { useState } from 'react'
import styled from 'styled-components'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'name'> {
  name: string
  label: string
  onChange: (value: string) => void
  validator?: (value: string) => string | React.ReactElement
}
const Input = ({ type, onChange, label, name, validator }: InputProps): React.ReactElement => {
  const [error, setError] = useState<string | React.ReactElement>('')

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    const validatorError = validator?.(value) ?? ''
    setError(validatorError)
    onChange(value)
  }

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <StyledInputContainer>
        <input id={name} type={type} onChange={onChangeHandler} aria-label={name} />
        <StyledError aria-label={`input-error-${name}`}>{error}</StyledError>
      </StyledInputContainer>
    </>
  )
}

export default Input

const StyledInputContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
`
const StyledError = styled.div`
  font-size: 14px;
  color: red;
`
