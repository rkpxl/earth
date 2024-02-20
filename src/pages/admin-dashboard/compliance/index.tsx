import React from 'react'
import axiosInstance from '../../../Utils/axiosUtil'
import Compliance from '../../../Scenes/AdminDashboard/Compliance'
import NoDataFound from '../../../Components/Common/NoData'

function index({ compliances, isAuthenticated }: any) {
  return (
    <>
      <Compliance compliances={compliances} />
    </>
  )
}

export const getServerSideProps = async function getServerSideProps(context: any) {
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token')
    if (response.status === 200) {
      const compliances = await axiosInstance.get('/compliance')
      return {
        props: {
          isAuthenticated: true,
          compliances: compliances.data,
        },
      }
    }
  } catch (err) {
    console.error('error', err)
  }

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  }
}

index.propTypes = {}

export default index
