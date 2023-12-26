/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useState } from 'react'
import Header from "./Header"
import WorkflowCard from "./WorkflowCard"
import PopUp from "./PopUp"
import TabSwitches from "./TabSwitches"
import CreateWorkflow from './CreateWorkflow/CreateWorkflowPopup'
import { useRouter } from 'next/router';

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
    <Header onClickHandle={handleToggel}/>
    {/* <TabSwitches /> */}
    <div>
      <WorkflowCard />
    </div>
    </Fragment>
  )
}

export default index