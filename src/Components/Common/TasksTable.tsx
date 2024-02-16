import { format } from 'date-fns'
import PerfectScrollbar from 'react-perfect-scrollbar'
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
  Tooltip,
} from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { SeverityPill } from '../Common/SeverityPills'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const tableHeader = [
  {
    headerTitle: 'Application Id',
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

const tableHeaderColumn = (title: String, index: number): JSX.Element => {
  return <TableCell key={index.toString()}>{title}</TableCell>
}

const sortableTableHeader = (title: String, index: number): JSX.Element => {
  return (
    <TableCell sortDirection="desc" key={index.toString()}>
      <Tooltip enterDelay={300} title="Sort">
        <TableSortLabel active direction="desc">
          {title}
        </TableSortLabel>
      </Tooltip>
    </TableCell>
  )
}

const tableHeaderRow = (): JSX.Element => {
  return (
    <TableHead>
      <TableRow>
        {tableHeader.map((header: any, index: number) => {
          return header?.isSortable
            ? sortableTableHeader(header?.headerTitle, index)
            : tableHeaderColumn(header?.headerTitle, index)
        })}
      </TableRow>
    </TableHead>
  )
}

export const TasksTable = (props: any) => {
  const router = useRouter()
  const { title, type } = props
  const [allTask, setAllTask] = React.useState([])

  React.useEffect(() => {
    if (props.type === 'pending') {
      axios
        .get(`${process.env.NEXT_PUBLIC_HOST_URL}/tasks/to/${localStorage.getItem('_id')}`)
        .then((response) => {
          setAllTask(response.data || [])
        })
        .catch((e) => console.error(e))
    } else {
      axios
        .get(`${process.env.NEXT_PUBLIC_HOST_URL}/tasks/by/${localStorage.getItem('_id')}`)
        .then((response) => {
          setAllTask(response.data || [])
        })
        .catch((e) => console.error(e))
    }
  }, [props.type])

  return (
    <Card {...props}>
      <CardHeader title={title} />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table key="table">
            {tableHeaderRow()}
            <TableBody>
              {allTask.map((e: any, index: number) => {
                const protocol = JSON.parse(e.rawJson)
                return (
                  <TableRow
                    hover
                    key={index}
                    onClick={() => {
                      router.push(`/view-task?id=${e._id}`)
                    }}
                  >
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
        }}
      >
        {allTask.length > 10 ? (
          <Button
            color="primary"
            endIcon={<ArrowRightIcon fontSize="small" />}
            size="small"
            variant="text"
          >
            View all
          </Button>
        ) : null}
      </Box>
    </Card>
  )
}

export default TasksTable
