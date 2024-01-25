import React from 'react'
import { format } from 'date-fns'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import { GetStaticPaths, GetStaticProps } from 'next'
import { SeverityPill } from '../../Components/Common/SeverityPills'

interface DataTableComponentProps {
  data: Array<{
    creator: string
    startDate: string
    endDate: string
    currentAssigneeName: string
    status: string
  }>
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
              <TableCell>{row.creator}</TableCell>
              <TableCell>
                {row?.startDate ? format(Number(row?.startDate), 'dd/MM/yyyy') : ''}
              </TableCell>
              <TableCell>
                {row?.endDate ? format(Number(row?.endDate), 'dd/MM/yyyy') : ''}
              </TableCell>
              <TableCell>{row.currentAssigneeName}</TableCell>
              <TableCell>
                <SeverityPill
                  color={
                    (row.status === 'APPROVED' && 'success') ||
                    (row.status === 'REJECTED' && 'error') ||
                    (row.status === 'PENDING' && 'warning') ||
                    'warning'
                  }
                >
                  {row.status}
                </SeverityPill>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DataTable
