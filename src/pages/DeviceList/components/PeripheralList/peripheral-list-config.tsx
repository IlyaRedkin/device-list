import { IPeripheralDevice } from '../GatewayList/_types'
import { IColumn } from 'components/Table/_types'
import { IPeripheralListContext } from './PeripheralList'
import DeletePeripheralButton from './components/DeletePeripheralButton'

export const columns: Array<IColumn<IPeripheralDevice, IPeripheralListContext>> = [
  {
    key: 'uid',
    title: 'UID',
    field: 'uid',
    width: 10
  },
  {
    key: 'vendor',
    title: 'Vendor',
    field: 'vendor',
    width: 10
  },
  {
    key: 'date',
    title: 'Date',
    renderer: ({ item }: { item: IPeripheralDevice }) => <div>{item.date.toLocaleString()}</div>,
    width: 10
  },
  {
    key: 'status',
    title: 'Status',
    field: 'status',
    width: 10
  },
  {
    key: 'deletePeripheral',
    title: '',
    renderer: (
      { item, context }: { item: IPeripheralDevice, context?: IPeripheralListContext }
    ) => {
      if (context) {
        return <DeletePeripheralButton item={item} gatewayDevice={context.gatewayDevice} />
      }
      return null
    },
    width: 10
  }
]
