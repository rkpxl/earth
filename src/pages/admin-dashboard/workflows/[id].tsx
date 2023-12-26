import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../Scenes/Home'
import Workflows from "../../../Components/Admin Dashboard/Workflows/CreateWorkflow"

export default function WorkFlowMoreDetails() {
    const router = useRouter()
  return (
    <Layout><Workflows id={router.query.id}/></Layout>
  )
}
