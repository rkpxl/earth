import React from 'react'
import Departments from '../../../Scenes/AdminDashboard/Departments'
import axiosInstance from '../../../Utils/axiosUtil'
import NoDataFound from '../../../Components/Common/NoData'

function index({ departments, isAuthenticated }: any) {

  return (
    <>
      <Departments departments={departments} />
    </>
  )
}

export const getServerSideProps = async function getServerSideProps(context: any) {
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token')
    if (response.status === 200) {
      const departments = await axiosInstance.get('/department')
      return {
        props: {
          isAuthenticated: true,
          departments: departments.data,
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

export default index
