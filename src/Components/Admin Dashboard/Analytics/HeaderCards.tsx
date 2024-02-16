import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Doughnut } from 'react-chartjs-2'
import 'chart.js/auto'
import { useAnalyticsContext } from '../../../pages/admin-dashboard/analytics'
import { getAnalyticsColor } from '../../../Utils/util'
import { ChartOptions } from 'chart.js/auto'

const options: ChartOptions<'doughnut'> = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
    },
  },
}

const Dashboard = () => {
  const { protocolAnalytics } = useAnalyticsContext()
  let totalProtocolCount = 0

  const consolidatedData = protocolAnalytics.totalStatusCounts.reduce(
    (acc: any, { _id, count }: any) => {
      // Normalize status names
      const status = _id.charAt(0).toUpperCase() + _id.slice(1).toLowerCase()
      acc[status] = (acc[status] || 0) + count
      totalProtocolCount += count
      return acc
    },
    {},
  )

  const labels = Object.keys(consolidatedData)
  const data = Object.values(consolidatedData)

  // Generate random colors for each segment
  const backgroundColor = labels.map((l, i) => getAnalyticsColor(i))

  const doughnutChartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
      },
    ],
  }

  return (
    <Grid container spacing={2} mt={3} pl={3} pr={3}>
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginBottom: '16px',
            padding: '16px',
            height: '100%',
            width: '100%',
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Total Workflows
            </Typography>
            <Typography variant="body1">Status: Active</Typography>
            <Typography variant="body1">Approved Count: 50</Typography>
            <Typography variant="body1">Rejected Count: 20</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Second Card: Chart */}
      <Grid item xs={12} md={4}>
        <Card
          style={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginBottom: '16px',
            padding: '16px',
            height: '100%',
            width: '100%',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Application Chart
          </Typography>
          <Typography variant="body2">Total Protocol: {totalProtocolCount}</Typography>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '100%', height: '200px' }}>
              <Doughnut data={doughnutChartData} options={options} width="100%" height="300px" />
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* Third Card: Analytics Information */}
      <Grid item xs={12} md={4}>
        <Card
          style={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginBottom: '16px',
            padding: '16px',
            height: '100%',
            width: '100%',
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Analytics
            </Typography>
            <Typography variant="body1">Total Revenue: $500,000</Typography>
            <Typography variant="body1">Total Users: 1000</Typography>
            <Typography variant="body1">Average Session Duration: 5 mins</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Dashboard
