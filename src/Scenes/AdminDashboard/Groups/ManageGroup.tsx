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
import { useRouter } from 'next/router';
import EditableGroup from './updateGroup';

function a11yProps(index: number) {
  return {
    id: `group-tab-${index}`,
    'aria-controls': `group-tabpanel-${index}`,
  };
}

export default function ManageGroup(props: type.IGroup) {
  const router = useRouter()

  const [value, setValue] = useState<number>(0);
  const { data , loading, error } = useSelector((state: RootState) => state.group);
  const dispatch : type.AppDispatch = useDispatch();

  const { id } = router.query
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
        <EditableGroup {...props}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} sx={{p: 0}}>
        Group Members
      </CustomTabPanel>
    </Grid>
  )
}


