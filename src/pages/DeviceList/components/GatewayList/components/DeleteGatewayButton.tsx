import React, { useContext, useReducer } from 'react'
import { IGatewayDevice } from '../_types'
import Modal from 'components/Modal/Modal'
import { DeviceListContext } from '../../../DeviceListProvider'

interface DeleteGatewayButtonProps {
  item: IGatewayDevice
}

const DeleteGatewayButton = ({ item }: DeleteGatewayButtonProps): React.ReactElement => {
  const { deleteGatewayItem } = useContext(DeviceListContext)
  const [deleteModal, toggleDeleteModal] = useReducer((value) => !value, false)
  const onDelete = (): void => {
    deleteGatewayItem(item)
    toggleDeleteModal()
  }

  return (
    <>
      <Modal
        title="Delete Gateway Device"
        open={deleteModal}
        onClose={toggleDeleteModal}
        onOk={onDelete}
        onCancel={toggleDeleteModal}
        okText="Delete"
        cancelText="Cancel"
      >
        Are you sure you want to delete "{item.name}"
      </Modal>
      <button onClick={toggleDeleteModal}>Delete</button>
    </>
  )
}

export default DeleteGatewayButton
