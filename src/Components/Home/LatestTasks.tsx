import React, { useMemo } from 'react'
import { format } from 'date-fns'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@mui/material'
import { SeverityPill } from '../Common/SeverityPills'
import { useHomeContext } from '../../pages'
import { getStandatedDateWithTime } from '../../Utils/dateTime'
import { IApproval, IProtocol } from '../../Utils/types/type'

export const LatestTasks = () => {
  const { allProtocols, allApprovals } = useHomeContext()

  const finalArray = useMemo(() => {
    const approvals = allApprovals?.data?.map((ap: IApproval) => ({
      ...ap,
      type: 'Pending Decision',
    }))
    const protocols = allProtocols?.data?.map((ap: IProtocol) => ({ ...ap, type: 'Protocol' }))

    const combinedArray = [...(approvals || []), ...(protocols || [])]
    return combinedArray
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Assuming createdAt is a string date
      .slice(0, 10)
      .map((t) => ({
        title: t.title,
        description: t.description,
        piName: t.piName,
        status: t.status,
        createdAt: t.createdAt,
        type: t.type,
      }))
  }, [allApprovals?.data, allProtocols?.data])

  return (
    <Card>
      <CardHeader title="Latest Activity" />
      <PerfectScrollbar>
        <Box sx={{ overflowX: 'auto', overflowY: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>PiName</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {finalArray.map((e, index) => (
                <TableRow hover key={index}>
                  <TableCell>{e.type}</TableCell>
                  <TableCell>{e.title || ''}</TableCell>
                  <TableCell>{e.description || ''}</TableCell>
                  <TableCell>{e.piName}</TableCell>
                  <TableCell>
                    <SeverityPill
                      color={
                        ((e.status.toLowerCase() === 'approved' ||
                          e.status.toLowerCase() === 'draft') &&
                          'success') ||
                        (e.status.toLowerCase() === 'rejected' && 'error') ||
                        (e.status.toLowerCase() === 'review' && 'warning') ||
                        'warning'
                      }
                    >
                      {e.status}
                    </SeverityPill>
                  </TableCell>
                  <TableCell>{e.createdAt ? getStandatedDateWithTime(e.createdAt) : ''}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  )
}
