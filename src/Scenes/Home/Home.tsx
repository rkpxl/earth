import React from 'react'
import Head from 'next/head';
import { Box, Button, Container, Grid } from '@mui/material';
import DoneTask from '../../Components/Home/DoneTasks';
import Progress from '../../Components/Home/Progress';
import PendingTask from '../../Components/Home/PendingTask';
import { LatestTasks } from '../../Components/Home/LatestTasks'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ProtocolPopUp from '../../Components/Common/ProtocolDialog'
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useHomeContext } from '../../pages';
import { ICompliance } from '../../Utils/types/type';
import axiosInstance from '../../Utils/axiosUtil';

interface TaskData {}

interface TaskPageProps {
  taskData: any;
}

const Home = () => {
  const homeContext = useHomeContext()
  const {  isAuthenticated, compliances, allProtocols, allApprovals } = homeContext
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [popOpen, setPopOpen] = React.useState(false);
  const [complianceType, setComplianceType] = React.useState<ICompliance>()
  const [allTask, setAllTask] = React.useState<any>([])
  const [pendingTask, setPendingTask] = React.useState([])
  const [doneTask, setApprovedTask] = React.useState([])
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    setAllTask([])
    setApprovedTask([])
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () : void=> {
    setAnchorEl(null);
  };

  const handlePopOpen = () : void => {
    setPopOpen(true);
    handleClose()
  };
  const handlePopClose = () : void => {
    setPopOpen(false);
  };
  const handleSubmitProtocol = () : void => {
    handlePopClose()
  } 

  const onComplienceClick = (comp: ICompliance) => {
    setComplianceType(comp);
    handlePopOpen()
  }

  return (
    <>
      <Head>
        <title>
          Home
        </title>
      </Head>
      <Box component="main"
        sx={{
          flexGrow: 1,
          py: 2
        }}
      >
        <Box sx={{
            pb: 2,
            pr: 2,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'end',
          }}
        >
          <Button
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            color="primary"
            sx={{ background: "primary.main"}}
          >
            Create new protocol
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handlePopOpen}
            sx={{ mt: 5}}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {compliances.map((comp : ICompliance) => (<MenuItem key={comp._id} onClick={() => onComplienceClick(comp)}>{comp.title}</MenuItem>))}
          </Menu>
        </Box>
        <Container maxWidth={false}>
          <Grid
            container
            spacing={2}
          >
            <Grid item lg={4} sm={6} xl={3} xs={12}>
              <DoneTask donetask={allProtocols?.length}/>
              {/* <Table data={allProtocols} /> */}
            </Grid>
            <Grid item lg={4} sm={6} xl={3} xs={12}>
              <PendingTask length={allApprovals.length} task={pendingTask} />
            </Grid>
            <Grid item lg={4} sm={6} xl={3} xs={12}>
              <Progress progress={Math.round(((doneTask.length/((pendingTask.length + doneTask.length) || 1) ) * 100))}/>
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              {/* <LatestOrders /> */}
            </Grid>
          </Grid>
          <LatestTasks task={allTask}/>
          <ProtocolPopUp handleClose={handlePopClose} popOpen={popOpen} handleSubmit={handleSubmitProtocol} complianceType={complianceType}/>
        </Container>
      </Box>
    </>
  );
}


export const getStaticPaths: GetStaticPaths = async () => {
  const paths: any[] = [];

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params } : any) => {
  return {
    props: {},
  };
}
export default Home;
