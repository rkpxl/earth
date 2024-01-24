/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import { Box, CircularProgress, Tab, Tabs } from '@mui/material';
import CustomTabPanel from '../../../Components/Common/CustomTabPanel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Utils/types/type';
import * as type from '../../../Utils/types/type';
import { useRouter } from 'next/router';
import UpdateCompliance from './UpdateCompliance';
import ManageComplianceStep from './ManageComplianceStep';

interface IProps {
  compliance: type.ICompliance,
  id: string | string[] | undefined,
  approvalRule: any
}

function a11yProps(index: number) {
  return {
    id: `compliance-tab-${index}`,
    'aria-controls': `compliance-tabpanel-${index}`,
  };
}

export default function ManageCompliance(props: IProps) {
  const { compliance, id, approvalRule } = props

  const router = useRouter()
  const [value, setValue] = useState<number>(0);
  const { data , loading, error } = useSelector((state: RootState) => state.compliance);
  const dispatch : type.AppDispatch = useDispatch();
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
          <Tab label="Compliances" {...a11yProps(0)} />
          {compliance?.tabNames?.sort((a : any, b : any) => parseInt(a.position) - parseInt(b.position)).map((step) => {
            return (<Tab key={step.position} label={step.name} {...a11yProps(step.position)} />)
          })}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} sx={{p: 0}}>
        <UpdateCompliance compliance={compliance} approvalRule={approvalRule}/>
      </CustomTabPanel>
      {compliance?.tabNames?.sort((a : any, b : any) => parseInt(a.position) - parseInt(b.position)).map((step, index) => {
        return (
          <CustomTabPanel key={index.toString()} value={value} index={index+1} sx={{p: 0}}>
            <ManageComplianceStep key={id?.toString()} id={id} tabNumber={index + 1} position={step.position} title={step.name} values={[]}/>
          </CustomTabPanel>
        )
      })}
    </Grid>
  )
}