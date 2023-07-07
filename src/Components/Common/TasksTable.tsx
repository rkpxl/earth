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

const tasks = [
  {
    id: 1,
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: 3,
    ref: 'CDD1048',
    amount: 25.1,
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'done'
  },
  {
    id: 5,
    ref: 'CDD1047',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930000000,
    status: 'reject'
  },
  {
    id: 6,
    ref: 'CDD1046',
    amount: 96.43,
    customer: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757200000,
    status: 'pending'
  },
  {
    id: 8,
    ref: 'CDD1045',
    amount: 32.54,
    customer: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670800000,
    status: 'done'
  },
  {
    id: 9,
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'done'
  }
];

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
  const { title }  = props
  return (
    <Card {...props}>
      <CardHeader title={title} />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            {tableHeaderRow()}
            <TableBody>
              {tasks.map((order) => (
                <TableRow
                  hover
                  key={order.id}
                >
                  <TableCell>
                    {order.ref}
                  </TableCell>
                  <TableCell>
                    {order.customer.name}
                  </TableCell>
                  <TableCell>
                    {format(order.createdAt, 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>
                    <SeverityPill
                      color={(order.status === 'done' && 'success')
                      || (order.status === 'reject' && 'error')
                      || 'warning'}
                    >
                      {order.status}
                    </SeverityPill>
                  </TableCell>
                </TableRow>
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
        <Button
          color="secondary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

export default TasksTable;