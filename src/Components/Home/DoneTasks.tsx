import { Avatar, Box, Button, Card, CardContent, Grid, Typography, Divider } from '@mui/material';
import MoneyIcon from '@mui/icons-material/Money';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import NextLink from 'next/link';

const DoneTask = (props : any) => {
  const { donetask } = props
  return (
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
            Approved Tasks
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {donetask}
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
          href="/done-tasks"
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
)};
export default DoneTask;
