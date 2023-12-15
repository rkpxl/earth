import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';


const Dashboard = () => {
  const cardStyle = {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '16px',
    padding: '16px',
    height: "100%",
    width: "100%",
  };

  // Sample data for the pie chart
  const chartData = {
    labels: ['Approved', 'Rejected'],
    datasets: [
      {
        data: [30, 10],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <Grid container spacing={2} mt={3} pl={3} pr={3}>
      {/* First Card: Workflow Information */}
      <Grid item xs={12} md={4}>
        <Card style={cardStyle}>
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
        <Card style={cardStyle}>
          <CardContent sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant="h6" gutterBottom>
              Workflows Chart
            </Typography>
            <div style={{width: '200px', height: '200px'}}>
              <Doughnut data={chartData} width="200px" height="200px"/>
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* Third Card: Analytics Information */}
      <Grid item xs={12} md={4}>
        <Card style={cardStyle}>
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
  );
};

export default Dashboard;
