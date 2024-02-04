import React, { useState } from 'react'
import Filters from './Filters'
import DataTable from './Table'
import { Grid } from '@mui/material'
import axiosInstance from '../../Utils/axiosUtil'
import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { showMessage } from '../../Store/reducers/snackbar'
import { endLoading, startLoading } from '../../Store/reducers/loading'
import { Page } from '../../Utils/constants'
import EditableTable from '../../Components/Common/EditableTable'
import Loading from '../../Components/Common/Loading'

interface Filters {
  startDate: string
  endDate: string
  searchPerson: string
  status: string
}

const AdminDashboard = (): JSX.Element => {
  const [filters, setFilters] = useState<Filters>({
    startDate: '',
    endDate: '',
    searchPerson: '',
    status: '',
  })
  const dispatch = useDispatch()
  const [tasks, setAllTask] = useState([])
  const [pageData, setPageData] = useState({
    currentPage: Page.defaultPage,
    pageSize: Page.defaultPageSize,
  })

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['protocol-dashboard'],
    queryFn: async () => {
      dispatch(startLoading())
      try {
        const response = await axiosInstance.get('/protocol/dashboard', {
          params: {
            ...filters,
            pageSize: pageData.pageSize,
            page: pageData.currentPage,
          },
        })
        if (response.status > 300) {
          dispatch(
            showMessage({
              message: 'Something went wring referesh your page',
              severity: 'warning',
            }),
          )
          return []
        }

        return response.data
      } catch (err) {
        console.error(err)
      } finally {
        dispatch(endLoading())
      }
    },
  })

  const handleApplyFilter = () => {
    refetch()
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Grid p={3}>
        <Filters handleApplyFilter={handleApplyFilter} filters={filters} setFilters={setFilters} />
      </Grid>
      <EditableTable
        data={data}
        title="All Protocols"
        handleRowClick={() => {}}
        pageData={pageData}
        setPageData={setPageData}
      />
    </>
  )
}

export default AdminDashboard
