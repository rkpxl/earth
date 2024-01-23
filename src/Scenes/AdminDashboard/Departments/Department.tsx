/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import PopUp from './PopUp';
import Header from '../../../Components/Admin Dashboard/Common/Header';
import AdminCard from '../../../Components/Admin Dashboard/Common/AdminCard';
import { useDispatch, useSelector } from 'react-redux';
import * as type from '../../../Utils/types/type';
import { CircularProgress, Pagination } from '@mui/material';
import axiosInstance from '../../../Utils/axiosUtil';
import { openConfirmation } from '../../../Store/reducers/confirm';
import ConfirmationPopup from '../../../Components/Common/ConfirmationDialog';
import { showMessage } from '../../../Store/reducers/snackbar';
import { fetchDepartments } from '../../../Store/reducers/department';
import GlobalPagination from '../../../Components/Common/GlobalPagination';


export default function Department(props: any) {
  const [open, setOpen] = useState(false);
  const { data , loading, error } = useSelector((state: type.RootState) => state.department);
  const departments = data || props.departments || []
  const dispatch : type.AppDispatch = useDispatch();
  const [pageData, setPageData] = useState({
    currentPage: 1,
    pageSize: 10
  })

  const handleOpenConfirmation = (args: any[]) => {
    dispatch(
      openConfirmation({
        args,
      })
    );
  };

  const handleConfirmation = async (id : string) => {
    try {
      const response = await axiosInstance.delete(`/department/${id}`);
      if(response.status === 200) {
        dispatch(showMessage({ message: 'Department is deleted', severity: 'success' }));
      } else {
        dispatch(showMessage({ message: 'Somehitng went wrong, please try again', severity: 'error' }));
      }
    } catch (err) {
      console.error(err)
      dispatch(showMessage({ message: 'Internal server error, contact to admin', severity: 'error' }));
    }
    dispatch(fetchDepartments({page: pageData.currentPage, pageSize: pageData.pageSize}))
  }

  const onChangeAPICall = (page : number, pageSize: number) => {
    dispatch(fetchDepartments({page: page, pageSize: pageSize}))
  }

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
      {departments?.data?.map((dep : any, index : number) => (
      <div key={dep.id}>
        <AdminCard card={dep} onDelete={() => handleOpenConfirmation(dep.id)}/>
      </div>))}
      {departments?.total > 10 ? 
        <GlobalPagination 
        totalItems={departments?.total} 
        onChange={setPageData}
        onChangeAPICall={onChangeAPICall}
        pageData={pageData}
      />
      : null}
      <ConfirmationPopup handleConfirm={handleConfirmation} />
    </Grid>
  )
}
