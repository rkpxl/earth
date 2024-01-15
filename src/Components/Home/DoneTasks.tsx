import { Avatar, Box, Button, Card, CardContent, Grid, Typography, Divider } from '@mui/material';
import MoneyIcon from '@mui/icons-material/Money';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import NextLink from 'next/link';
import { DoneTaskIcon } from '../../icons/doneTask'

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
            ALL Protocols
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {donetask}
          </Typography>
        </Grid>
        <Grid item>
          <Box
            sx={{
              background: 'transparent',
              height: 68,
              width: 68
            }}
          >
             <img
              alt="Approved tasks"
              src="/static/images/tick.svg"
              style={{
                display: 'inline-block',
                maxWidth: '100%',
              }}
            />
          </Box>
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
