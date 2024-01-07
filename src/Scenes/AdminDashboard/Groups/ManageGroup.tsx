/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useState } from 'react'
import Grid from '@mui/material/Grid';
import { Box, CircularProgress, Tab, Tabs } from '@mui/material';
import CustomTabPanel from '../../../Components/Common/CustomTabPanel';
import axiosInstance from '../../../Utils/axiosUtil';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Utils/types/type';
import * as type from '../../../Utils/types/type';
import { useRouter } from 'next/router';
import EditableGroup from './updateGroup';

import ManagaeGroupMember from './ManagaeGroupMember';

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
  const [searchText, setSearchText] = useState<string>('');

  

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
        <ManagaeGroupMember />
      </CustomTabPanel>
    </Grid>
  )
}


