/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useState } from 'react'
import Header from "../Common/Header"
import CreateWorkflow from './CreateWorkflow/CreateWorkflowPopup'
import { useRouter } from 'next/router';
import AdminCard from '../Common/AdminCard';


const apiResponse = [
  {
    _id: "658925e9da1904eae77d97ab",
    name: "Admin Workflow",
    id: "1",
    orgId: "1",
    type: "department",
    isActive: "true",
    primaryEmail: "math@gmail.com",
    createdAt: "2023-12-25T06:49:13.767Z",
    updatedAt: "2023-12-25T06:49:13.767Z",
    __v: 0
  }
]


function index() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleToggel = () => {
    setOpen((prev) => !prev);
  };

  const onProceedHandle = () => {
    router.push('/admin-dashboard/workflows/123'); 
  }

  return (
  <Fragment>
    <CreateWorkflow open={open} onClose={handleToggel} onProceed={onProceedHandle} />
    <Header onClickHandle={handleToggel} title="Workflow" buttonText="Create New Workflow"/>
    {/* <TabSwitches /> */}
    <div>
      <AdminCard card={apiResponse[0]} />
    </div>
    </Fragment>
  )
}

export default index