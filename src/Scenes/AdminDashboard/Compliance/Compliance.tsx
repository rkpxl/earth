/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import CreateComplianceDialog from './CreateComplianceDialog';
import Header from '../../../Components/Admin Dashboard/Common/Header';
import AdminCard from '../../../Components/Admin Dashboard/Common/AdminCard';
import { useDispatch, useSelector } from 'react-redux';
import * as type from '../../../Utils/types/type';
import { CircularProgress } from '@mui/material';
import axiosInstance from '../../../Utils/axiosUtil';
import { openConfirmation } from '../../../Store/reducers/confirm';
import ConfirmationPopup from '../../../Components/Common/ConfirmationDialog';
import { showMessage } from '../../../Store/reducers/snackbar';
import { useRouter } from 'next/router';
import { fetchCompliances } from '../../../Store/reducers/compliance';


export default function Compliance(props: any) {
  const [open, setOpen] = useState(false);
  const { data , loading, error } = useSelector((state: type.RootState) => state.compliance);
  const compliances = data || props.compliances || []
  const dispatch : type.AppDispatch = useDispatch();
	const router = useRouter()

  const handleOpenConfirmation = (args: any[]) => {
    dispatch(
      openConfirmation({
        args,
      })
    );
  };

  const handleConfirmation = async (id : string) => {
    try {
      const response = await axiosInstance.delete(`/compliance/${id}`);
      if(response.status === 200) {
        dispatch(showMessage({ message: 'Compliance is deleted', severity: 'success' }));
      } else {
        dispatch(showMessage({ message: 'Somehitng went wrong, please try again', severity: 'error' }));
      }
    } catch (err) {
      console.error(err)
      dispatch(showMessage({ message: 'Internal server error, contact to admin', severity: 'error' }));
    }
    dispatch(fetchCompliances())
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	const redirectToGroup = (id: string) => {
    router.push(`/admin-dashboard/compliance/${id}`)
  }

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
      <Header onClickHandle={handleClickOpen} title="Compliance" buttonText="Create New Compliance"/>
      <CreateComplianceDialog open={open} onClose={handleClose}/>
      {compliances.map((comp : any) => (
      <div key={comp.id}>
        <AdminCard card={comp} onDelete={() => handleOpenConfirmation(comp.id)} onManageClick={() => redirectToGroup(comp.id)}/>
      </div>))}
      <ConfirmationPopup handleConfirm={handleConfirmation} />
    </Grid>
  )
}
