import React from 'react'
import HeaderCard from './HeaderCards'
import LineChartCard from './LineChartCard'
import Grid from '@mui/material/Grid'

export default function   Index() {
  return (
    <Grid mb={4}>
      <HeaderCard />
      <LineChartCard />
    </Grid>
  )
}
