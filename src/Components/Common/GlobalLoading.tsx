import React from 'react';
import { CircularProgress, Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../Utils/types/type';

const GlobalLoading: React.FC = () => {

  const loading = useSelector((state : RootState) => state.globalLoading)

  if(loading?.isLoading) {
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
        <CircularProgress />
      </Grid>
    );
  }

  return (<></>)
};

export default GlobalLoading;
