import React, { useContext } from 'react'
import Approvals from '../../../Components/Admin Dashboard/Approvals'
import axiosInstance from '../../../Utils/axiosUtil'

function Index({ protocolAnalytics }: any) {
  return (
    <>
      <Approvals />
    </>
  )
}

export default Index
