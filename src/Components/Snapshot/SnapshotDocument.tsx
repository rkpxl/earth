import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { getStandatedDate } from '../../Utils/dateTime';
import NoDataFound from '../Common/NoData';

const SnapshotDocuemt = ({ documents } : any) => {

  if(!documents || documents?.length < 1) {
    return (<NoDataFound />)
  }
  return (
    <Box sx={{ m : 3 }}>
      <TableContainer component={Paper}>
        <Table aria-label="document table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Provider Name</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents?.map((doc : any) => (
              <TableRow key={doc?._id}>
                <TableCell>{doc?.title}</TableCell>
                <TableCell>{doc?.providerName}</TableCell>
                <TableCell>{getStandatedDate(doc?.createdAt)}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.open(doc?.docLink, '_blank')}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SnapshotDocuemt;
