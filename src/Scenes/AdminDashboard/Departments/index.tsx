/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import PopUp from './PopUp';
import Header from '../../../Components/Admin Dashboard/Common/Header';
import AdminCard from '../../../Components/Admin Dashboard/Common/AdminCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Utils/types/type';
import { CircularProgress } from '@mui/material';


export default function index(props: any) {
  const [open, setOpen] = useState(false);
  const { data , loading, error } = useSelector((state: RootState) => state.department);
  const departments = data || props.departments || []

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if(loading) {
    return (
    <>
      <CircularProgress />
    </>);
  }

  if(error) {
    <>
      Try again
    </>
  }

  return (
    <Grid>
      <Header onClickHandle={handleClickOpen} title="Department" buttonText="Create New Departments"/>
      <PopUp open={open} onClose={handleClose} onSave={handleClose}/>
      {departments.map((dep : any, index : number) => (
      <div key={index.toString()}>
        <AdminCard card={dep} />
      </div>))}
    </Grid>
  )
}
