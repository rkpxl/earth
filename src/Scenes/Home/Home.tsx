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


const Home = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [popOpen, setPopOpen] = React.useState(false);
  const [protocolType, setprotocolType] = React.useState('')

  const open = Boolean(anchorEl);
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

  const handleNewProtocolCreation = (type: string) => {
    setprotocolType(type);
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
          py: 4
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
            color="secondary"
            sx={{ background: "secondary"}}
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
            <MenuItem onClick={() => handleNewProtocolCreation('chemical')}>Chemical</MenuItem>
            <MenuItem onClick={() => handleNewProtocolCreation('IRB')}>IRB</MenuItem> 
            <MenuItem onClick={() => handleNewProtocolCreation('human ethics')}>Human Ethics</MenuItem>
          </Menu>
        </Box>
        <Container maxWidth={false}>
          <Grid
            container
            spacing={2}
          >
            <Grid item lg={4} sm={6} xl={3} xs={12}>
              <DoneTask />
            </Grid>
            <Grid item lg={4} sm={6} xl={3} xs={12}>
              <PendingTask />
            </Grid>
            <Grid item lg={4} sm={6} xl={3} xs={12}>
              <Progress />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              {/* <LatestOrders /> */}
            </Grid>
          </Grid>
          <LatestTasks />
          <ProtocolPopUp handleClose={handlePopClose} popOpen={popOpen} handleSubmit={handleSubmitProtocol} protocolType={protocolType}/>
        </Container>
      </Box>
    </>
  );
}

export default Home;
