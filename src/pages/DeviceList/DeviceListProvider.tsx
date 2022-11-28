import React, { createContext, useState } from 'react'
import { IGatewayDevice, IPeripheralDevice } from './components/GatewayList/_types'
import { v4 as uuidv4 } from 'uuid'

interface IDeviceListContext {
  gatewayList: IGatewayDevice[]
  addGatewayItem: (gatewayItem: IGatewayDevice) => void
  deleteGatewayItem: (gatewayItem: IGatewayDevice) => void
  addPeripheralItem: (gatewayItem: IGatewayDevice, peripheralItem: IPeripheralDevice) => void
  deletePeripheralItem: (gatewayItem: IGatewayDevice, peripheralItem: IPeripheralDevice) => void
}

const gatewayDeviceList: IGatewayDevice[] = [
  {
    serialNumber: uuidv4(),
    name: 'test gateway',
    ipv4: '192.168.1.1',
    children: [
      {
        uid: uuidv4(),
        vendor: 'Vendor 1',
        date: new Date(),
        status: 'online'
      },
      {
        uid: uuidv4(),
        vendor: 'Vendor 2',
        date: new Date(),
        status: 'offline'
      }
    ]
  }
]

export const DeviceListContext = createContext<IDeviceListContext>({
  gatewayList: [],
  addGatewayItem: () => {},
  deleteGatewayItem: () => {},
  addPeripheralItem: () => {},
  deletePeripheralItem: () => {}
})

interface DeviceListProviderProps {
  children: React.ReactNode
}
export const DeviceListProvider = ({ children }: DeviceListProviderProps): React.ReactElement => {
  const [gatewayList, setGatewayList] = useState<IGatewayDevice[]>(gatewayDeviceList)

  const addGatewayItem = (gatewayItem: IGatewayDevice): void => {
    setGatewayList([...gatewayList, gatewayItem])
  }
  const deleteGatewayItem = (gatewayItem: IGatewayDevice): void => {
    setGatewayList([...gatewayList.filter((item) => item.serialNumber !== gatewayItem.serialNumber)])
  }

  const addPeripheralItem = (gatewayItem: IGatewayDevice, peripheralItem: IPeripheralDevice): void => {
    const gatewayItemIndex = gatewayList.findIndex((item) => item.serialNumber === gatewayItem.serialNumber)
    gatewayList[gatewayItemIndex] = {
      ...gatewayItem,
      children: [
        ...gatewayItem.children,
        peripheralItem
      ]
    }
    setGatewayList([...gatewayList])
  }
  const deletePeripheralItem = (gatewayItem: IGatewayDevice, peripheralItem: IPeripheralDevice): void => {
    const gatewayItemIndex = gatewayList.findIndex((item) => item.serialNumber === gatewayItem.serialNumber)
    gatewayList[gatewayItemIndex] = {
      ...gatewayItem,
      children: gatewayItem.children.filter((item) => item.uid !== peripheralItem.uid)
    }
    setGatewayList([...gatewayList])
  }

  return (
    <DeviceListContext.Provider
      value={{
        gatewayList,
        addGatewayItem,
        deleteGatewayItem,
        addPeripheralItem,
        deletePeripheralItem
      }}
    >{children}
    </DeviceListContext.Provider>
  )
}
