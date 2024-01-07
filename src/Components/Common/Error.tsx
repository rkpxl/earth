import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Error: React.FC<{ message?: string }> = ({ message = 'An error occurred' }) => {
  return (
    <Grid
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <Paper elevation={3} sx={{ padding: (theme) => theme.spacing(2), textAlign: 'center', maxWidth: '400px' }}>
        <ErrorOutlineIcon color="error" fontSize="large" sx={{ marginBottom: (theme) => theme.spacing(2) }} />
        <Typography variant="h5" color="error" gutterBottom>
          Error 
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ marginBottom: (theme) => theme.spacing(2) }}>
          {message}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Error;
