import React, { useContext, useReducer } from 'react'
import Modal from 'components/Modal/Modal'
import { DeviceListContext } from '../../../DeviceListProvider'
import { IGatewayDevice, IPeripheralDevice } from '../../GatewayList/_types'

interface DeleteGatewayButtonProps {
  item: IPeripheralDevice
  gatewayDevice: IGatewayDevice
}

const DeletePeripheralButton = ({ item, gatewayDevice }: DeleteGatewayButtonProps): React.ReactElement => {
  const { deletePeripheralItem } = useContext(DeviceListContext)
  const [deleteModal, toggleDeleteModal] = useReducer((value) => !value, false)
  const onDelete = (): void => {
    deletePeripheralItem(gatewayDevice, item)
    toggleDeleteModal()
  }

  return (
    <>
      <Modal
        title="Delete Peripheral Device"
        open={deleteModal}
        onClose={toggleDeleteModal}
        onOk={onDelete}
        onCancel={toggleDeleteModal}
        okText="Delete"
        cancelText="Cancel"
      >
        Are you sure you want to delete "{item.vendor}"
      </Modal>
      <button onClick={toggleDeleteModal}>Delete</button>
    </>
  )
}

export default DeletePeripheralButton
