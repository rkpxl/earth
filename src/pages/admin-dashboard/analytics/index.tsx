import React, { useEffect } from 'react'
import Analytics from '../../../Components/Admin Dashboard/Analytics'
import { useRouter } from 'next/router'

function Index() {
  const router = useRouter()

  useEffect(() => {
    router.push('/admin-dashboard/departments')
  }, [router])

  return (
    <>
      <Analytics />
    </>
  )
}

Index.propTypes = {}

export default Index
