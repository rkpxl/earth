import { Avatar, Box, Card, CardContent, Grid, Typography, Button, Divider } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import NextLink from 'next/link';

export const PendingTask = (props : any) => (
  <Card {...props} sx={{ height: '100%' }}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            Pending Tasks
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            1.6k
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Divider
          sx={{
            borderColor: 'textSecondary',
            py: 1,
          }}
        />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
       <NextLink
          style={{width: '100%'}}
          href="/pending-tasks"
        >
          <Button
            color="secondary"
            endIcon={<ArrowRightIcon fontSize="small" />}
            size="small"
            variant="text"
            sx={{mt: 1}}
          >
            View all
          </Button>
        </NextLink>
      </Box>
    </CardContent>
  </Card>
);

export default PendingTask;