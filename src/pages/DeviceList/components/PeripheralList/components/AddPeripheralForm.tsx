import React, { useEffect, useState } from 'react'
import Input from 'components/Input/Input'
import Select from 'components/Select/Select'
import { IPeripheralDeviceStatus } from '../../GatewayList/_types'

export interface IAddPeripheralForm {
  data: {
    vendor: string
    status: IPeripheralDeviceStatus
  }
  valid: boolean

}
interface AddPeripheralFormProps {
  onChange: ({ data, valid }: IAddPeripheralForm) => void
}

const VALIDATOR = {
  vendor: (value: string) => {
    if (!value) {
      return 'required'
    }
    return ''
  },
  status: (value: string) => {
    if (!value) {
      return 'required'
    }
    return ''
  }
}

const AddPeripheralForm = ({ onChange }: AddPeripheralFormProps): React.ReactElement => {
  const [vendor, setVendor] = useState<string>('')
  const [status, setStatus] = useState<IPeripheralDeviceStatus>('online')

  useEffect(() => {
    onChange({
      data: {
        vendor,
        status
      },
      valid: !VALIDATOR.vendor(vendor) && !VALIDATOR.status(status)
    })
  }, [vendor, status])

  return (
    <>
      <Input
        name="vendor"
        label="Vendor"
        onChange={setVendor}
        type="text"
        validator={VALIDATOR.vendor}
      />
      <Select
        name="status"
        label="Status"
        onChange={(value) => setStatus(value as IPeripheralDeviceStatus)}
        options={['online', 'offline']}
        validator={VALIDATOR.status}
        value={status}
      />
    </>
  )
}
export default AddPeripheralForm
