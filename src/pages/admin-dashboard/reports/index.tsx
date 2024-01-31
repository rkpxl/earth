import React, { useEffect } from 'react'
import Review from '../../../Components/Admin Dashboard/Approvals'
import { useRouter } from 'next/router'

function Index() {
  const router = useRouter()

  useEffect(() => {
    router.push('/admin-dashboard/departments')
  }, [router])
  return (
    <div>
      <Review />
    </div>
  )
}

Index.propTypes = {}

export default Index
