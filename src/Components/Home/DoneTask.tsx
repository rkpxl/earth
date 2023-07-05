import { Avatar, Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const DoneTask = (props : any) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
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
            Done Task
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            24
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography>
        <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        View all
      </Button>
      </Box>
    </CardContent>
  </Card>
);
export default DoneTask;
