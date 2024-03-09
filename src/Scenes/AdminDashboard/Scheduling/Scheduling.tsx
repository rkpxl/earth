import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Box, CircularProgress, Tab, Tabs } from '@mui/material'
import CustomTabPanel from '../../../Components/Common/CustomTabPanel'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../Utils/types/type'
import Header from '../../../Components/Admin Dashboard/Common/Header'
import UpComing from './UpComing'
import Completed from './Completed'


function a11yProps(index: number) {
  return {
    id: `compliance-tab-${index}`,
    'aria-controls': `compliance-tabpanel-${index}`,
  }
}



export default function Scheduling( { schedulers } : any) {

  const router = useRouter()
  const [value, setValue] = useState<number>(0)
  const [open, setOpen] = useState(false)
  const { data, loading, error } = useSelector((state: RootState) => state.compliance)
  const dispatch: AppDispatch = useDispatch()
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  console.log('schedulers', schedulers)
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Upcoming" {...a11yProps(0)} />
          <Tab label="Completed" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <CustomTabPanel  value={value} index={0} sx={{ p: 0 }}>
        <UpComing schedulers={schedulers}/>
      </CustomTabPanel>
      <CustomTabPanel  value={value} index={1} sx={{ p: 0 }}>
        <Completed />
      </CustomTabPanel>

    </>
  )
}