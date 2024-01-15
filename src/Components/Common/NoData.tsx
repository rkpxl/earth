import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const NoDataFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <SentimentVeryDissatisfiedIcon fontSize="large" color="primary" />
      <Typography variant="h5" component="div" gutterBottom>
        No Data Found
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Sorry, but there is no data available.
      </Typography>
    </Box>
  );
};

export default NoDataFound;
