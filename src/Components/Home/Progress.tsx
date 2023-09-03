import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';


const customStyles = {
  root: {
    backgroundColor: '#b385fc',
    color: "black" // Change the background color to black
  },
  bar: {
    backgroundColor: '#b385fc', // Change the progress bar color to black
    color: "black"
  },
};

export const Progress = (props  : any) => {
  const { progress } = props
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
            TASKS PROGRESS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {progress}%
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
              alt="Task progress"
              loading='lazy'
              src="/static/images/paper.svg"
              style={{
                display: 'inline-block',
                maxWidth: '100%',
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <LinearProgress
          value={progress}
          variant="determinate"
          sx={{
            '.MuiLinearProgress-bar': {
              backgroundColor: '#b385fc', // Change the progress bar color to black
            },
          }}
        />
      </Box>
    </CardContent>
  </Card>
)};

export default Progress;