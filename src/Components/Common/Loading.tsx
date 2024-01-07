import React from 'react';
import { CircularProgress, Grid, Paper } from '@mui/material';

const Loading: React.FC = () => {
  return (
    <Grid
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}
    >
      <Paper elevation={3} sx={{ padding: (theme) => theme.spacing(2) }}>
        <CircularProgress />
      </Paper>
    </Grid>
  );
};

export default Loading;
