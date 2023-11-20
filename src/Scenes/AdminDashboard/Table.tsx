import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';
import { SeverityPill } from '../../Components/Common/SeverityPills';

interface DataTableComponentProps {
  data: Array<{
    name: string;
    startDate: string;
    endDate: string;
    currentAssignment: string;
    status: string;
  }>;
}

const DataTable: React.FC<DataTableComponentProps> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Current Assignment</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.startDate}</TableCell>
              <TableCell>{row.endDate}</TableCell>
              <TableCell>{row.currentAssignment}</TableCell>
              <TableCell>
                <SeverityPill
                  color={(row.status === 'APPROVED' && 'success')
                  || (row.status === 'REJECTED' && 'error')
                  || (row.status === 'PENDING' && 'warning') || 'warning'}
                >
                  {row.status}
                </SeverityPill></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
