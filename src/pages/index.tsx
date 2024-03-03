import React, { useContext, useEffect } from 'react'
import type { NextPage } from 'next'
import HomePage from '../Scenes/Home/Home'
import axiosInstance from '../Utils/axiosUtil'
import { useDispatch } from 'react-redux'
import { updateNotificationData } from '../Store/reducers/notification'

const HomeContext = React.createContext<any>(null)

const Home: NextPage = ({
  isAuthenticated,
  compliances,
  departments,
  allProtocols,
  allApprovals,
  allActiveApprovals,
  notificationCount,
}: any) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateNotificationData({ total: notificationCount.total, data: [] }))
  }, [notificationCount, dispatch])

  return (
    <HomeContext.Provider
      value={{
        isAuthenticated,
        compliances,
        departments,
        allProtocols,
        allApprovals,
        allActiveApprovals,
      }}
    >
      <HomePage />
    </HomeContext.Provider>
  )
}

export const getServerSideProps = async function getServerSideProps(context: any) {
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token', context)
    if (response.status === 200) {
      const [
        compliances,
        departments,
        allProtocols,
        allApprovals,
        allActiveApprovals,
        notificationCount,
      ] = await Promise.all([
        axiosInstance.get('/compliance'),
        axiosInstance.get('/department'),
        axiosInstance.get('/protocol/get-all'),
        axiosInstance.get('/approval/all-review-ready'),
        axiosInstance.get('/approval/all-active'),
        axiosInstance.get('/notification/active-count'),
      ])
      return {
        props: {
          isAuthenticated: true,
          compliances: compliances.data,
          departments: departments.data,
          allProtocols: allProtocols.data,
          allApprovals: allApprovals.data,
          allActiveApprovals: allActiveApprovals.data,
          notificationCount: notificationCount.data,
        },
      }
    }
  } catch (err) {
    console.error('home server error', err)
  }

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  }
}

export default Home

export const useHomeContext = () => {
  return useContext(HomeContext)
}
