import React, { useMemo } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Line } from 'react-chartjs-2'
import { useAnalyticsContext } from '../../../pages/admin-dashboard/analytics'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { getAnalyticsColor } from '../../../Utils/util'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

type StatusCount = {
  _id: {
    date: string
    status: string
  }
  count: number
}

const cardStyle = {
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginBottom: '16px',
  padding: '16px',
  height: '100%',
  width: '100%',
}

const processData = (data: StatusCount[]) => {
  const sortedDays = Array.from(
    new Set(
      data.map((item) => {
        return item._id.date
      }),
    ),
  ).sort()

  const statusMapping: Record<string, string> = {
    approved: 'Approved',
    draft: 'Draft',
    review: 'Pending',
  }

  // Initialize datasets with predefined categories and colors
  const datasets: Record<string, { label: string; borderColor: string; data: (number | null)[] }> =
    {
      Approved: {
        label: 'Approved',
        borderColor: getAnalyticsColor(0),
        data: new Array(sortedDays.length).fill(null),
      },
      Pending: {
        label: 'Pending',
        borderColor: getAnalyticsColor(1),
        data: new Array(sortedDays.length).fill(null),
      },
      Draft: {
        label: 'Draft',
        borderColor: getAnalyticsColor(2),
        data: new Array(sortedDays.length).fill(null),
      },
      Other: {
        label: 'Multiple States',
        borderColor: getAnalyticsColor(3),
        data: new Array(sortedDays.length).fill(null),
      },
    }

  data.forEach(({ _id, count }) => {
    const { date, status } = _id
    const category = statusMapping[status.toLowerCase()] || 'Other'
    const dayIndex = sortedDays.indexOf(date)
    datasets[category].data[dayIndex] = (datasets[category].data[dayIndex] || 0) + count
  })

  // Convert datasets object to array format expected by Chart.js
  const datasetsArray = Object.values(datasets).map((dataset) => ({
    ...dataset,
    data: dataset.data.map((count) => (count === null ? 0 : count)), // Convert nulls to zeros
  }))

  return { labels: sortedDays, datasets: datasetsArray }
}

const LineChartCard = () => {
  const { protocolAnalytics } = useAnalyticsContext()
  const { statusCountsPerDay } = protocolAnalytics

  const lineChartData = processData(statusCountsPerDay)

  return (
    <Grid container spacing={2} mt={3} pl={3} pr={3}>
      <Grid item xs={12}>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
            Application Processed Per Day
            </Typography>
            <Line data={lineChartData} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default LineChartCard
