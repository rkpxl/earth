import React, { useEffect } from 'react'
import Workflows from '../../../Components/Admin Dashboard/Workflows'
import { useRouter } from 'next/router'

function Index() {
  const router = useRouter()

  useEffect(() => {
    router.push('/admin-dashboard/departments')
  }, [router])

  return (
    <>
      <Workflows />
    </>
  )
}

Index.propTypes = {}

export default Index
