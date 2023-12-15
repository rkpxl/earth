import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Line } from 'react-chartjs-2';

const LineChartCard = () => {
  // ... (Existing code)
  const cardStyle = {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '16px',
    padding: '16px',
    height: "100%",
    width: "100%"
  };


  // Sample data for the Line chart
  const lineChartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Approved',
        borderColor: '#36A2EB',
        data: [5, 10, 15, 8, 20, 12, 25],
      },
      {
        label: 'Pending',
        borderColor: '#FFCE56',
        data: [2, 5, 8, 12, 15, 18, 22],
      },
      {
        label: 'Multiple States',
        borderColor: '#FF6384',
        data: [3, 8, 10, 6, 15, 10, 18],
      },
    ],
  };

  return (
    <Grid container spacing={2} mt={3} pl={3} pr={3}>
      {/* ... (Existing code) */}

      {/* Fourth Card: Line Chart */}
      <Grid item xs={12}>
        <Card style={cardStyle}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Applications Processed per Day
            </Typography>
            <Line data={lineChartData} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LineChartCard;
