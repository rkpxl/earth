import React from 'react'
import Scheduling from '../../../Scenes/AdminDashboard/Scheduling'
import axiosInstance from '../../../Utils/axiosUtil'

function index( { schedulers } : any) {
  return (
    <>
      <Scheduling schedulers={schedulers}/>
    </>
  )
}

export const getServerSideProps = async function getServerSideProps(context: any) {
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token')
    if (response.status === 200) {
      const schedulers = await axiosInstance.get('/scheduler')
      return {
        props: {
          isAuthenticated: true,
          schedulers: schedulers.data,
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
