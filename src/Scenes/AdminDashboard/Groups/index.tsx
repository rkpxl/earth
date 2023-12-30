/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import PopUp from './PopUp';
import Header from '../../../Components/Admin Dashboard/Common/Header';
import AdminCard from '../../../Components/Admin Dashboard/Common/AdminCard';
import { Box, CircularProgress, Tab, Tabs } from '@mui/material';
import CustomTabPanel from '../../../Components/Common/CustomTabPanel';
import axiosInstance from '../../../Utils/axiosUtil';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Utils/types/type';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function index(props: any) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number>(0);
  const { data , loading, error } = useSelector((state: RootState) => state.group);
  const groups = data || props.groups || []

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
          <AdminCard card={grp} />
        </div>))}
      </CustomTabPanel>
    </Grid>
  )
}
