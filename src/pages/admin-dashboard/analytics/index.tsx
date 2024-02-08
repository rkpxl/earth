import React, { useContext, useEffect } from 'react'
import Analytics from '../../../Components/Admin Dashboard/Analytics'
import { useRouter } from 'next/router'
import axiosInstance from '../../../Utils/axiosUtil'

const AnalyticsContext = React.createContext<any>(null)

function Index({ protocolAnalytics }: any) {
  const router = useRouter()

  return (
    <AnalyticsContext.Provider value={{ protocolAnalytics }}>
      <Analytics />
    </AnalyticsContext.Provider>
  )
}

export const getServerSideProps = async function getServerSideProps(context: any) {
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token')
    if (response.status === 200) {
      const protocolAnalytics = await axiosInstance.get('/protocol/analytics')
      return {
        props: {
          isAuthenticated: true,
          protocolAnalytics: protocolAnalytics.data,
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

export const useAnalyticsContext = () => {
  return useContext(AnalyticsContext)
}

export default Index
