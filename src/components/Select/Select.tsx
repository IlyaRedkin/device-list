import React, { useState } from 'react'
import styled from 'styled-components'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label: string
  value: string
  onChange: (value: string) => void
  validator?: (value: string) => string
  options: string[]
}
const Select = ({ onChange, label, name, validator, options, value }: InputProps): React.ReactElement => {
  const [error, setError] = useState<string>('')

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value
    const validatorError = validator?.(value) ?? ''
    setError(validatorError)
    onChange(value)
  }

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <StyledInputContainer>
        <select id={name} onChange={onChangeHandler} value={value}>
          {!value && <option disabled value=""> -- select an option -- </option>}
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        <StyledError>{error}</StyledError>
      </StyledInputContainer>
    </>
  )
}

export default Select

const StyledInputContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
`
const StyledError = styled.div`
  font-size: 14px;
  color: red;
`
