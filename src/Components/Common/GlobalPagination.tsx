import React, { Suspense } from 'react'
import Loading from './Loading'
import { Pagination, Select, MenuItem, FormControl, Box } from '@mui/material'
interface GlobalPaginationProps {
  totalItems: number
  onChange: Function
  pageData: {
    currentPage: number
    pageSize: number
  }
  onChangeAPICall?: Function
  defaultRowsPerPage?: number
}

const GlobalPagination: React.FC<GlobalPaginationProps> = ({
  totalItems,
  onChange,
  pageData,
  onChangeAPICall,
  defaultRowsPerPage = 10,
}) => {
  const totalPages = Math.ceil(totalItems / (pageData?.pageSize || defaultRowsPerPage))

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    if (onChange) {
      onChange((prev: any) => ({ ...prev, currentPage: newPage }))
      onChangeAPICall && onChangeAPICall(newPage, pageData.pageSize)
    }
  }

  const handleRowsPerPageChange = (event: any) => {
    const newRowsPerPage = parseInt(event.target.value as string, 10)
    const newPage =
      Math.floor(((pageData.currentPage - 1) * pageData.pageSize) / newRowsPerPage) + 1

    if (onChange) {
      onChange((prev: any) => {
        return { ...prev, pageSize: newRowsPerPage, currentPage: newPage }
      })
      onChangeAPICall && onChangeAPICall(newPage, newRowsPerPage)
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        sx={{ mb: 5 }}
      >
        <Pagination count={totalPages} page={pageData?.currentPage} onChange={handlePageChange} />
        <FormControl sx={{ marginLeft: { xs: 0, sm: 2 }, marginTop: { xs: 2, sm: 0 } }}>
          <Select
            labelId="rows-per-page-label"
            id="rows-per-page"
            value={pageData?.pageSize}
            variant="standard"
            onChange={handleRowsPerPageChange}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Suspense>
  )
}

export default GlobalPagination
