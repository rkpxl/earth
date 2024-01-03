import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import axiosInstance from '../../Utils/axiosUtil'
import { AppDispatch, ICompliance } from '../../Utils/types/type'
import { Box, Tab, Tabs } from '@mui/material';
import Layout from '../../Scenes/Home/HomeLayout'
import { useDispatch } from 'react-redux';
import CustomTabPanel from '../../Components/Common/CustomTabPanel';
import Protocol from '../../Scenes/Protocol';

interface IProps {
  compliance: ICompliance
}

function a11yProps(index: number) {
  return {
    id: `dyf-tab-${index}`,
    'aria-controls': `dyf-tabpanel-${index}`,
  };
}

export default function DynamicForm(props : IProps) {
  const router = useRouter()
  const { id } = router.query
  const { compliance } = props

  const [value, setValue] = useState<number>(0);
  const dispatch : AppDispatch = useDispatch();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  

  return (
    <Layout>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Summary" {...a11yProps(0)} />
          {compliance?.stepNames?.sort((a : any, b : any) => parseInt(a.position) - parseInt(b.position)).map((step) => {
            return (<Tab key={step.position} label={step.name} {...a11yProps(step.position)} />)
          })}
          <Tab label="Attachment" {...a11yProps(0)} />
          <Tab label="Submit" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>Summary</CustomTabPanel>
      {compliance?.stepNames?.sort((a : any, b : any) => parseInt(a.position) - parseInt(b.position)).map((step, index: number) => {
        return (<CustomTabPanel key={step.name} value={value} index={index+1}>
            <Protocol 
              key={step.name} 
              compliance={compliance} 
              complianceId={id} 
              stepNumber={index+1} 
              values={step.values}
            />
          </CustomTabPanel>)
      })}
      <CustomTabPanel value={value} index={compliance?.stepNames?.length + 1}>Attachment</CustomTabPanel>
      <CustomTabPanel value={value} index={compliance?.stepNames?.length + 2}>Submit</CustomTabPanel>
    </Layout>
  )
}

export const getServerSideProps = async function getServerSideProps(context : any) {
  const { id } = context.query
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token');
    if(response.status === 200) {
      const compliance = await axiosInstance.get(`/compliance/${id}`);
      return {
        props: {
          isAuthenticated: true,
          compliance: compliance.data
        },
      };
    }
  } catch (err) {
    console.error("error", err)
  }

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
}
