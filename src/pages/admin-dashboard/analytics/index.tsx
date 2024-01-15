import React, { useEffect } from 'react'
import Layout from '../../../Scenes/Home'
import Analytics from "../../../Components/Admin Dashboard/Analytics";
import { useRouter } from 'next/router';

function Index() {
  const router = useRouter()

  useEffect(() => {
    router.push("/admin-dashboard/departments")
  },[])

  return (
   <Layout><Analytics /></Layout>
  )
}

Index.propTypes = {}

export default Index