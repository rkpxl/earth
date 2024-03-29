import Component from '../../Scenes/AdminDashboard'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const DoneTasks = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/admin-dashboard/dashboard')
  }, [router])

  return (
    <>
      <Component />
    </>
  )
}

export default DoneTasks
