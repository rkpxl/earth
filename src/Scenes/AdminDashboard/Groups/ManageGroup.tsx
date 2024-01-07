/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import { Box, Tab, Tabs } from '@mui/material';
import CustomTabPanel from '../../../Components/Common/CustomTabPanel';
import AddGroupMember from './AddGroupMember';
import RemoveGroupMember from './RemoveGroupMember';

function a11yProps(index: number) {
  return {
    id: `group-tab-${index}`,
    'aria-controls': `group-tabpanel-${index}`,
  };
}

export default function ManageGroup(props: any) {
  const { group } =props
  const [value, setValue] = useState<number>(0);


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Groups" {...a11yProps(0)} />
          <Tab label="Add Group Members" {...a11yProps(1)} />
          <Tab label="Remove Group Members" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} sx={{p: 0}}>
        Group detai
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} sx={{p: 0}}>
        <AddGroupMember group={group}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2} sx={{p: 0}}>
        <RemoveGroupMember />
      </CustomTabPanel>
    </Grid>
  )
}


