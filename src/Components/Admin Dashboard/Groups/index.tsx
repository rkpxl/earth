/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import PopUp from './PopUp';
import Header from '../Common/Header';
import AdminCard from '../Common/AdminCard';
import { Box, Tab, Tabs } from '@mui/material';
import CustomTabPanel from '../../Common/CustomTabPanel';


const apiResponse = [
    {
        _id: "658925e9da1904eae77d97ab",
        name: "Board1",
        id: "1",
        orgId: "1",
        type: "department",
        isActive: "true",
        primaryEmail: "math@gmail.com",
        createdAt: "2023-12-25T06:49:13.767Z",
        updatedAt: "2023-12-25T06:49:13.767Z",
        __v: 0
    },
    {
        _id: "658925e9da1904eae77d97ab",
        name: "Board2",
        id: "2",
        orgId: "1",
        isActive: "true",
        type: "department",
        primaryEmail: "math@gmail.com",
        createdAt: "2023-12-25T06:49:13.767Z",
        updatedAt: "2023-12-25T06:49:13.767Z",
        __v: 0
    }
]

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function index() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
        <PopUp open={open} onClose={handleClose} onSave={handleClose} />
        {apiResponse.map((dep, index) => (
        <div key={index.toString()}>
          <AdminCard card={dep} />
        </div>))}
      </CustomTabPanel>
    </Grid>
  )
}
