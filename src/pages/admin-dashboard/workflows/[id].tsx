import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Workflows from '../../../Components/Admin Dashboard/Workflows/CreateWorkflow'

export default function WorkFlowMoreDetails() {
  const router = useRouter()

  useEffect(() => {
    router.push('/admin-dashboard/departments')
  }, [])
  return (
    <>
      <Workflows id={router.query.id} />
    </>
  )
}
