import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { getStandatedDateWithTime } from '../../Utils/dateTime';

interface EditableTableProps {
  data: Array<Record<string, any>>;
  excludedColumns?: string[];
  title: string,
  handleRowClick?: (...args : any) => void
}

const EditableTable: React.FC<EditableTableProps> = ({ title, data, handleRowClick, excludedColumns = ['_id', '__v', 'pi_id', 'currentAssignee_id', 'createdBy'] }) => {
  const [showColumnsDialog, setShowColumnsDialog] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(() =>
    Object.keys(data[0]).reduce((acc : any, key) => {
      acc[key] = !excludedColumns.includes(key);
      return acc;
    }, {})
  );
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'asc' | 'desc' | undefined }>({
    key: null,
    direction: 'asc',
  });

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const order = sortConfig.direction === 'asc' ? 1 : -1;
    return a[sortConfig.key] > b[sortConfig.key] ? order : -order;
  });

  const toggleColumnsDialog = () => {
    setShowColumnsDialog(!showColumnsDialog);
  };

  const handleColumnToggle = (column: string) => {
    setVisibleColumns((prevVisibleColumns : any) => ({
      ...prevVisibleColumns,
      [column]: !prevVisibleColumns[column],
    }));
  };

  const handleSort = (column: string) => {
    setSortConfig((prevSortConfig) => ({
      key: column,
      direction: prevSortConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  if (!data || data.length === 0) {
    return <p>No data to display.</p>;
  }

  const columns = Object.keys(data[0]);
  const visibleColumnsForDialog = columns.filter((column) => !excludedColumns.includes(column));

  return (
    <>
      <style scoped>
        {`
          .MuiTableContainer-root  {
            border-radius: 12px;
          }
          ::-webkit-scrollbar {
            width: 12px;
          }

          ::-webkit-scrollbar-thumb {
            background-color: #bbb; /* Scrollbar thumb color */
            border-radius: 20px;
            width: 10px;
            border: 3px solid #fff; /* Border around the thumb */
          }

          ::-webkit-scrollbar-track {
            background-color: #eee; /* Scrollbar track color */
          }

          /* Hover animation for table rows */
          tbody tr:hover {
            background-color: #f5f5f5;
            transition: background-color 0.3s ease-in-out;
          }
        `}
      </style>
      <div style={{ margin: '16px', padding: '16px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={10} alignItems="center">
            <Typography sx={{ color: 'black', fontSize: "28px", fontWeight: '700' }}>{title}</Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              onClick={toggleColumnsDialog}
              sx={{ mb: 2, borderRadius: '8px', maxHeight: "400px", overflowY: "auto" }}
            >
              Choose Columns
            </Button>
          </Grid>
        </Grid>
        <Dialog open={showColumnsDialog} onClose={toggleColumnsDialog} sx={{minWidth: "250px"}}>
          <DialogTitle>Choose Columns</DialogTitle>
          <DialogContent>
            {visibleColumnsForDialog.map((column) => (
              <div key={column}>
                <label>
                  <Checkbox
                    checked={visibleColumns[column]}
                    onChange={() => handleColumnToggle(column)}
                  />
                  {column}
                </label>
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleColumnsDialog}>Close</Button>
          </DialogActions>
        </Dialog>
        <TableContainer>
          <Table sx={{ maxHeight: 400, overflowY: 'auto' }}>
            <TableHead>
              <TableRow>
                {visibleColumnsForDialog.map((column, index) =>
                visibleColumns[column] ? (
                  <TableCell key={index}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        width: '120px',
                        fontWeight: '720'
                      }}
                      onClick={() => handleSort(column)}
                    >
                      <span>{column}</span>
                      {sortConfig.key === column && (
                        <IconButton size="small">
                          {sortConfig.direction === 'asc' ? (
                            <ArrowUpwardIcon sx={{ width: '16px', height: '16px'}}/>
                          ) : (
                            <ArrowDownwardIcon sx={{ width: '16px', height: '16px'}} />
                          )}
                        </IconButton>
                      )}
                    </div>
                  </TableCell>
                ) : null
              )}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    backgroundColor: rowIndex % 2 === 0 ? '#ffffff' : '#f4f4f4',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleRowClick ? handleRowClick(row) : () => {}}
                >
                  {visibleColumnsForDialog.map(
                    (column, columnIndex) =>
                      visibleColumns[column] && (
                        <TableCell key={columnIndex}>
                          {column === 'createdAt' || column === 'updatedAt'
                            ? getStandatedDateWithTime(row[column])
                            : row[column]}
                        </TableCell>
                      )
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default EditableTable;
