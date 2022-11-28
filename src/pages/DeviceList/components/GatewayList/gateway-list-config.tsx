import { IGatewayDevice } from './_types'
import { IColumn } from 'components/Table/_types'
import PeripheralList from '../PeripheralList/PeripheralList'
import DeleteGatewayButton from './components/DeleteGatewayButton'

export const columns: Array<IColumn<IGatewayDevice, {}>> = [
  {
    key: 'serialNumber',
    title: 'Serial Number',
    field: 'serialNumber',
    width: 10
  },
  {
    key: 'name',
    title: 'Name',
    field: 'name',
    width: 10
  },
  {
    key: 'ipv4',
    title: 'IP v4',
    field: 'ipv4',
    width: 10
  },
  {
    key: 'peripheralDevices',
    title: 'Peripheral Devices',
    renderer: ({ item }: { item: IGatewayDevice }) => <PeripheralList data={item.children} gatewayDevice={item} />,
    width: 10
  },
  {
    key: 'deleteGateway',
    title: '',
    renderer: ({ item }: { item: IGatewayDevice }) => <DeleteGatewayButton item={item} />,
    width: 10
  }
]
