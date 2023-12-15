import React, { Fragment, useState } from 'react'
import Header from "./Header"
import WorkflowCard from "./WorkflowCard"
import PopUp from "./PopUp"
import TabSwitches from "./TabSwitches"

function index() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
  <Fragment>
    <PopUp open={open} onClose={handleClose} onSave={handleClose} />
    <Header />
    <TabSwitches />
    <div onClick={handleClickOpen}>
      <WorkflowCard />
    </div>
    </Fragment>
  )
}

export default index