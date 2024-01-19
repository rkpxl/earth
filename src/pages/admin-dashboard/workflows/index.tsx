import React, { useEffect } from 'react'
import Layout from '../../../Scenes/Home'
import Workflows from "../../../Components/Admin Dashboard/Workflows"
import { useRouter } from 'next/router'

function Index() {
  const router = useRouter()

  useEffect(() => {
    router.push("/admin-dashboard/departments")
  },[])
  
  return (
   <><Workflows /></>
  )
}

Index.propTypes = {}

export default Index