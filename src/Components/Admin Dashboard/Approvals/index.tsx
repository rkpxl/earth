import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import ApprovalsCard from  "./ApprovalsCard"
import PopUp from './PopUp';
import Header from './Header';

export default function index() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid>
      <Header onClickHandle={handleClickOpen} />
      <PopUp open={open} onClose={handleClose} onSave={handleClose} />
      <div onClick={handleClickOpen}>
        <ApprovalsCard />
      </div>
    </Grid>
  )
}
