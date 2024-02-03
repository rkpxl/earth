import React from 'react'
import { TextField, Button, Grid, MenuItem, FormControl, InputLabel, Select } from '@mui/material'

interface FiltersComponentProps {
  handleApplyFilter: Function
  filters: any
  setFilters: Function
}

interface Filters {
  startDate: string
  endDate: string
  searchPerson: string
  status: string
}

const ApprovalAction = [
  { key: 'AMENDMENT', value: 'Amendment'},
  { key: 'REVISE', value: 'Revise'},
  { key: 'EXPIRE', value: 'Expire'},
  { key: 'CLOSURE', value: 'Closure'},
  { key: 'CONREV', value: 'Continuous Review' },
  { key: 'APPROVED', value: 'Approved' },
  { key: 'DRAFT', value: 'Draft' },
  { key: 'REVIEW', value: 'Review' },
]

const FiltersComponent: React.FC<FiltersComponentProps> = ({
  filters,
  setFilters,
  handleApplyFilter,
}) => {
  const handleFilterChange = (field: keyof Filters, value: string) => {
    setFilters((prevFilters: any) => ({ ...prevFilters, [field]: value }))
  }

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={3}>
        <TextField
          label="Start Date"
          type="date"
          value={filters.startDate}
          onChange={(e) => handleFilterChange('startDate', e.target.value)}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          label="End Date"
          type="date"
          value={filters.endDate}
          onChange={(e) => handleFilterChange('endDate', e.target.value)}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          label="Search for People"
          value={filters.searchPerson}
          onChange={(e) => handleFilterChange('searchPerson', e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status}
            label="Status"
            onChange={(e) => handleFilterChange('status', e.target.value as string)}
          >
            <MenuItem value="">Select</MenuItem>
            {ApprovalAction.map((a) => <MenuItem key={a.key} value={a.value}>{a.value}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={() => handleApplyFilter()}>
          Apply Filters
        </Button>
      </Grid>
    </Grid>
  )
}

export default FiltersComponent
