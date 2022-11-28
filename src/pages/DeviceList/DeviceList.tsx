import React from 'react'
import GatewayList from './components/GatewayList/GatewayList'
import styled from 'styled-components'
import { DeviceListProvider } from './DeviceListProvider'

const DeviceList = (): React.ReactElement => {
  return <Layout>
    <DeviceListProvider>
      <GatewayList />
    </DeviceListProvider>
  </Layout>
}

export default DeviceList

const Layout = styled.div`
  margin: 32px;
`
