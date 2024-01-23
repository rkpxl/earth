import React, { useEffect } from 'react'
import Layout from '../../../Scenes/Home'
import Approvals from "../../../Components/Admin Dashboard/Approvals";
import { useRouter } from 'next/router';

function Index() {
  const router = useRouter()

  return (
   <><Approvals /></>
  )
}

Index.propTypes = {}

export default Index