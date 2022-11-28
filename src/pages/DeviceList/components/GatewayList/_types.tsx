export type IPeripheralDeviceStatus = 'online' | 'offline'
export interface IPeripheralDevice {
  uid: string
  vendor: string
  date: Date
  status: IPeripheralDeviceStatus
}

export interface IGatewayDevice {
  serialNumber: string
  name: string
  ipv4: string
  children: IPeripheralDevice[]
}
