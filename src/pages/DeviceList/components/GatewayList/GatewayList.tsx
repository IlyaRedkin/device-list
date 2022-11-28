import React, { useContext, useReducer, useState } from 'react'
import { Table } from 'components/Table'
import { IGatewayDevice } from './_types'
import { columns } from './gateway-list-config'
import { DeviceListContext } from '../../DeviceListProvider'
import Modal from 'components/Modal/Modal'
import { v4 as uuidv4 } from 'uuid'
import AddGatewayForm, { IAddGatewayForm } from './components/AddGatewayForm'

const MAX_LIST_LENGTH = 10
const GatewayList = (): React.ReactElement => {
  const { gatewayList, addGatewayItem } = useContext(DeviceListContext)
  const [addModal, toggleAddModal] = useReducer((value) => !value, false)
  const [formData, setFormData] = useState<IAddGatewayForm>()

  const onAdd = (): void => {
    if (formData?.valid) {
      addGatewayItem({
        ...formData.data,
        serialNumber: uuidv4(),
        children: []
      })
      toggleAddModal()
    }
  }

  return <>
    <Modal
      title="Add Gateway Device"
      open={addModal}
      onClose={toggleAddModal}
      onOk={onAdd}
      onCancel={toggleAddModal}
      okText="Add"
      cancelText="Cancel"
      disabled={!formData?.valid}
    >
      <AddGatewayForm onChange={setFormData} />
    </Modal>
    <Table<IGatewayDevice, {}>
      data={gatewayList}
      columns={columns}
      getItemKey={(item) => item.serialNumber}
    />
    <button onClick={toggleAddModal} disabled={gatewayList.length >= MAX_LIST_LENGTH}>Add Gateway Device</button>
  </>
}

export default GatewayList
