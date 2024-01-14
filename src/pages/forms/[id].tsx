import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import axiosInstance from '../../Utils/axiosUtil'
import { AppDispatch, ICompliance, IProtocol } from '../../Utils/types/type'
import { Box, Tab, Tabs } from '@mui/material';
import Layout from '../../Scenes/Home/HomeLayout'
import { useDispatch } from 'react-redux';
import CustomTabPanel from '../../Components/Common/CustomTabPanel';
import Protocol from '../../Scenes/Protocol';
import FormAttachment from '../../Components/Common/Form/FormAttachments';
import FormSubmit from '../../Components/Common/Form/FormSubmit';
import FormPersonnel from '../../Components/Common/Form/FormPersonnel';

interface IProps {
  compliance: ICompliance,
  protocol: IProtocol
}

function a11yProps(index: number) {
  return {
    id: `dyf-tab-${index}`,
    'aria-controls': `dyf-tabpanel-${index}`,
  };
}

export default function DynamicForm(props : IProps) {
  const router = useRouter()
  const { compliance, protocol } = props
  const { id: protocol_id } = router.query as { id: string };

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
          {compliance?.tabNames?.sort((a : any, b : any) => parseInt(a.position) - parseInt(b.position)).map((step) => {
            return (<Tab key={step.position} label={step.name} {...a11yProps(step.position)} />)
          })}
          <Tab label="Personnel" {...a11yProps(compliance?.tabNames?.length + 1)} />
          <Tab label="Attachment" {...a11yProps(compliance?.tabNames?.length + 2)} />
          <Tab label="Submit" {...a11yProps(compliance?.tabNames?.length + 3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>Summary</CustomTabPanel>
      {compliance?.tabNames?.sort((a : any, b : any) => parseInt(a.position) - parseInt(b.position)).map((step, index: number) => {
        return (<CustomTabPanel key={step.name} value={value} index={index+1}>
            <Protocol 
              key={step.name} 
              compliance={compliance} 
              tabNumber={index+1} 
              step={step}
              protocol={protocol}
            />
          </CustomTabPanel>)
      })}
       <CustomTabPanel value={value} index={compliance?.tabNames?.length + 1}>
        <FormPersonnel compliance={compliance} protocol={protocol}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={compliance?.tabNames?.length + 2}>
        <FormAttachment compliance={compliance} protocol={protocol}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={compliance?.tabNames?.length + 3}>
        <FormSubmit compliance={compliance} protocol={protocol} />
      </CustomTabPanel>
    </Layout>
  )
}

export const getServerSideProps = async function getServerSideProps(context : any) {
  const { id } = context.query
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token');
    if(response.status === 200) {
      const protocol : any = await axiosInstance.get(`/protocol/${id}`);
      if(!protocol) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
      const compliance = await axiosInstance.get(`/compliance/${protocol.data.complianceId}`);
      return {
        props: {
          isAuthenticated: true,
          compliance: compliance.data,
          protocol: protocol.data
        },
      };
    }
  } catch (err) {
    console.error("error", err)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
}
