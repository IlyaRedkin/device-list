import React, { useContext, useReducer, useState } from 'react'
import { Table } from 'components/Table'
import { IGatewayDevice, IPeripheralDevice } from '../GatewayList/_types'
import { columns } from './peripheral-list-config'
import Modal from 'components/Modal/Modal'
import AddPeripheralForm, { IAddPeripheralForm } from './components/AddPeripheralForm'
import { DeviceListContext } from '../../DeviceListProvider'
import { v4 as uuidv4 } from 'uuid'

interface PeripheralListProps {
  data: IPeripheralDevice[]
  gatewayDevice: IGatewayDevice
}
export interface IPeripheralListContext {
  gatewayDevice: IGatewayDevice
}

const MAX_LIST_LENGTH = 10

const PeripheralList = ({ data, gatewayDevice }: PeripheralListProps): React.ReactElement => {
  const { addPeripheralItem } = useContext(DeviceListContext)
  const [addModal, toggleAddModal] = useReducer((value) => !value, false)
  const [formData, setFormData] = useState<IAddPeripheralForm>()
  const onAdd = (): void => {
    if (formData?.valid) {
      addPeripheralItem(gatewayDevice, {
        ...formData.data,
        date: new Date(),
        uid: uuidv4()
      })
      toggleAddModal()
    }
  }

  return (
    <>
      <Modal
        title="Add Peripheral Device"
        open={addModal}
        onClose={toggleAddModal}
        onOk={onAdd}
        onCancel={toggleAddModal}
        okText="Add"
        cancelText="Cancel"
        disabled={!formData?.valid}
      >
        <AddPeripheralForm onChange={setFormData} />
      </Modal>
      <Table<IPeripheralDevice, IPeripheralListContext>
        data={data}
        columns={columns}
        getItemKey={(item) => item.uid.toString()}
        context={{ gatewayDevice }}
      />
      <button onClick={toggleAddModal} disabled={data.length >= MAX_LIST_LENGTH}>Add Peripheral Device</button>
    </>
  )
}

export default PeripheralList
