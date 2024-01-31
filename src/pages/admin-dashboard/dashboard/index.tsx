import Component from '../../../Scenes/AdminDashboard'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Dashboard = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/admin-dashboard/departments')
  }, [router])

  return (
    <>
      <Component />
    </>
  )
}

export default Dashboard
