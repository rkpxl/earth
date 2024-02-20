import React from 'react'
import Groups from '../../../Scenes/AdminDashboard/Groups'
import axiosInstance from '../../../Utils/axiosUtil'
import NoDataFound from '../../../Components/Common/NoData'

function index({ group, isAuthenticated }: any) {

  return (
    <>
      <Groups groups={group} />
    </>
  )
}

export const getServerSideProps = async function getServerSideProps(context: any) {
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token')
    if (response.status === 200) {
      const group = await axiosInstance.get('/group')
      return {
        props: {
          isAuthenticated: true,
          group: group.data,
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
