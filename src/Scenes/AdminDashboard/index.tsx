import React, { useEffect, useState } from 'react'
import Filters from './Filters'
import DataTable from './Table'
import { Grid } from '@mui/material'
import axios from 'axios'

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
  const [tasks, setAllTask] = useState([])

  const fetchData = () => {
    const filteredFilters = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => value !== ''),
    )

    axios
      .get(`${process.env.NEXT_PUBLIC_HOST_URL}/tasks/filter`, {
        params: {
          userId: '',
          org: localStorage.getItem('org'),
          ...filteredFilters,
        },
      })
      .then((response) => {
        setAllTask(response.data || [])
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleApplyFilter = () => {
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <Grid p={3}>
      <Filters handleApplyFilter={handleApplyFilter} filters={filters} setFilters={setFilters} />
      <Grid mt={3}>
        <DataTable data={tasks} />
      </Grid>
    </Grid>
  )
}

export default AdminDashboard
