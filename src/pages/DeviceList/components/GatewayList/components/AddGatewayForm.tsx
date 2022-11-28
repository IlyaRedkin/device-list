import React, { useEffect, useState } from 'react'
import Input from 'components/Input/Input'
import { IGatewayDevice } from '../_types'

const ipv4Regexp = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/

export interface IAddGatewayForm {
  data: Pick<IGatewayDevice, 'name' | 'ipv4'>
  valid: boolean
}

interface AddGatewayFormProps {
  onChange: ({ data, valid }: IAddGatewayForm) => void
}

const VALIDATOR = {
  name: (value: string) => {
    if (!value) {
      return 'required'
    }
    return ''
  },
  ipv4: (value: string) => {
    if (!ipv4Regexp.test(value)) {
      return <span>Please use ip v4 <a href="https://en.wikipedia.org/wiki/IPv4" target="_blank">format</a></span>
    }
    return ''
  }
}

const AddGatewayForm = ({ onChange }: AddGatewayFormProps): React.ReactElement => {
  const [name, setName] = useState<string>('')
  const [ipv4, setIpv4] = useState<string>('')

  useEffect(() => {
    onChange({
      data: {
        name,
        ipv4
      },
      valid: !VALIDATOR.name(name) && !VALIDATOR.ipv4(ipv4)
    })
  }, [name, ipv4])

  return (
    <>
      <Input
        name="name"
        label="Name"
        onChange={setName}
        type="text"
        validator={VALIDATOR.name}
      />
      <Input
        name="ipv4"
        label="Ip v4"
        onChange={setIpv4}
        validator={VALIDATOR.ipv4}
      />
    </>
  )
}
export default AddGatewayForm
