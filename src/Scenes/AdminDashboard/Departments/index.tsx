/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import PopUp from './PopUp';
import Header from '../../../Components/Admin Dashboard/Common/Header';
import AdminCard from '../../../Components/Admin Dashboard/Common/AdminCard';


export default function index(props: any) {
  const { departments = [] } = props
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    // dispatch(showMessage({ message: 'Department is added', severity: 'success' }));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid>
      <Header onClickHandle={handleClickOpen} title="Department" buttonText="Create New Departments"/>
      <PopUp open={open} onClose={handleClose} onSave={handleClose} />
      {departments.map((dep : any, index : number) => (
      <div key={index.toString()}>
        <AdminCard card={dep} />
      </div>))}
    </Grid>
  )
}
