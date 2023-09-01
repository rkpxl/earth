import { format } from 'date-fns';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../Common/SeverityPills';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const tableHeader = [
    {
        headerTitle: 'Protocol Id',
        isSortable: false,
    },
    {
        headerTitle: 'Creator',
        isSortable: false,
    },
    {
        headerTitle: 'Date',
        isSortable: true,
    },
    {
        headerTitle: 'Status',
        isSortable: false,
    },
]

const tableHeaderColumn = (title : String) : JSX.Element => {
  return (
    <TableCell>
      {title}
    </TableCell>
  )
}

const sortableTableHeader = (title : String) : JSX.Element => {
  return (
    <TableCell sortDirection="desc">
      <Tooltip
        enterDelay={300}
        title="Sort"
      >
        <TableSortLabel
          active
          direction="desc"
        >
          {title}
        </TableSortLabel>
      </Tooltip>
    </TableCell>
  )
}

const tableHeaderRow = () : JSX.Element => {
  return (
    <TableHead>
      <TableRow>
        {tableHeader.map((header : any) => {
          return header?.isSortable ? sortableTableHeader(header?.headerTitle) : tableHeaderColumn(header?.headerTitle)
        })}
      </TableRow>
    </TableHead>
  )
}

export const TasksTable = (props : any) => {

  const router = useRouter()
  const { title, type }  = props
  const [allTask, setAllTask] = React.useState([])

  React.useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/tasks/to/${localStorage.getItem('_id')}`).then((response) => {
      setAllTask(response.data || [])
    }).catch((e) => console.log(e))
  }, [])

  
  return (
    <Card {...props}>
      <CardHeader title={title} />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table key="table">
            {tableHeaderRow()}
            <TableBody>
              {allTask.filter((t : any) => (t.status = type || type === 'all')).map(((e : any, index : number) => {
              const protocol = JSON.parse(e.rawJson).data
                return (
                  <TableRow
                    hover
                    key={index}
                    onClick={() => {
                      router.push(`/view-task?id=${e._id}`)
                    }}
                  >
                    <TableCell>
                      {e._id.slice(-6).toString().toUpperCase()}
                    </TableCell>
                    <TableCell>
                      {protocol.creator}
                    </TableCell>
                    <TableCell>
                      {format(protocol.date, 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      <SeverityPill
                        color={(e.status === 'approval' && 'success')
                        || (e.status === 'reject' && 'error')
                        || (e.status === 'PENDING' && 'warning') || 'warning'}
                      >
                        {e.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                )}
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        {allTask.filter((t : any) => (t.status = type || type === 'all')).length > 10 ? <Button
          color="secondary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          variant="text"
        >
          View all
        </Button> : null}
      </Box>
    </Card>
  );
}

export default TasksTable;