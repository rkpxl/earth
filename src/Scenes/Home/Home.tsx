import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import DoneTask from '../../Components/Home/Donetask';
import Progress from '../../Components/Home/Progress';
import PendingTask from '../../Components/Home/PendingTask';
import { LatestTasks } from '../../Components/Home/LatestTasks'

const Home = () => (
  <>
    <Head>
      <title>
        Home
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            lg={4}
            sm={6}
            xl={3}
            xs={12}
          >
            <DoneTask />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xl={3}
            xs={12}
          >
            <Progress />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xl={3}
            xs={12}
          >
            <PendingTask />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            {/* <LatestOrders /> */}
          </Grid>
        </Grid>
        <LatestTasks />
      </Container>
    </Box>
  </>
);

export default Home;
