/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import PopUp from './PopUp';
import Header from '../../../Components/Admin Dashboard/Common/Header';
import AdminCard from '../../../Components/Admin Dashboard/Common/AdminCard';
import { Box, CircularProgress, Tab, Tabs } from '@mui/material';
import CustomTabPanel from '../../../Components/Common/CustomTabPanel';
import axiosInstance from '../../../Utils/axiosUtil';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Utils/types/type';
import ConfirmationPopup from '../../../Components/Common/ConfirmationDialog';
import * as type from '../../../Utils/types/type';
import { showMessage } from '../../../Store/reducers/snackbar';
import { openConfirmation } from '../../../Store/reducers/confirm';
import { fetchGroups } from '../../../Store/reducers/group';

function a11yProps(index: number) {
  return {
    id: `group-tab-${index}`,
    'aria-controls': `group-tabpanel-${index}`,
  };
}

export default function index(props: any) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number>(0);
  const { data , loading, error } = useSelector((state: RootState) => state.group);
  const groups = data || props.groups || []
  const dispatch : type.AppDispatch = useDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmation = async (id : string) => {
    try {
      const response = await axiosInstance.delete(`/group/${id}`);
      if(response.status === 200) {
        dispatch(showMessage({ message: 'Group is deleted', severity: 'success' }));
      } else {
        dispatch(showMessage({ message: 'Somehitng went wrong, please try again', severity: 'error' }));
      }
    } catch (err) {
      console.error(err)
      dispatch(showMessage({ message: 'Internal server error, contact to admin', severity: 'error' }));
    }
    dispatch(fetchGroups())
  }

  const handleOpenConfirmation = (args: any[]) => {
    dispatch(
      openConfirmation({
        args,
      })
    );
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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Groups" {...a11yProps(0)} />
          <Tab label="Manage Group Members" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} sx={{p: 0}}>
        <Header onClickHandle={handleClickOpen} title="Groups" buttonText="Create New Group"/>
        <PopUp open={open} onClose={handleClose} onSave={handleClose}/>
        {groups.map((grp : any, index : number) => (
        <div key={index.toString()}>
          <AdminCard card={grp} onDelete={() => handleOpenConfirmation(grp.id)}/>
        </div>))}
      </CustomTabPanel>
      <ConfirmationPopup handleConfirm={handleConfirmation} />
    </Grid>
  )
}


