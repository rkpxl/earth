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

export const LatestTasks = (props: any) => {
  const { task } = props
  return (
    <Card {...props}>
      <CardHeader title="Latest Tasks" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Protocol Id</TableCell>
                <TableCell>Creator</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Start Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {task.map((e: any) => {
                const protocol = JSON.parse(e.rawJson)
                return (
                  <TableRow hover key={e._id}>
                    <TableCell>{e._id.slice(-6).toString().toUpperCase()}</TableCell>
                    <TableCell>{protocol?.creator}</TableCell>
                    <TableCell>
                      {protocol?.date ? format(protocol?.date, 'dd/MM/yyyy') : ''}
                    </TableCell>
                    <TableCell>
                      <SeverityPill
                        color={
                          (e.status === 'APPROVED' && 'success') ||
                          (e.status === 'REJECTED' && 'error') ||
                          (e.status === 'PENDING' && 'warning') ||
                          'warning'
                        }
                      >
                        {e.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      {/* <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="secondary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box> */}
    </Card>
  )
}
