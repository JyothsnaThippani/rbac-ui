import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Chart from 'react-apexcharts';
import axios from 'axios';

const DashboardPage = () => {
  const [chartData, setChartData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/chartData'); // Replace with your JSON server endpoint
        const { data, labels } = response.data;

        setChartData([{ name: 'User Growth', data }]); 
        setCategories(labels); 
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    chart: {
      type: 'line',
      height: 400,
    },
    title: {
      text: 'Monthly User Growth',
      align: 'center',
    },
    xaxis: {
      categories: categories,
      title: {
        text: 'Months',
      },
    },
    yaxis: {
      title: {
        text: 'Users',
      },
    },
    stroke: {
      curve: 'smooth',
    },
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Box sx={{ height: 400, width: '100%' }}>
        <Chart options={chartOptions} series={chartData} type="line" height="400" />
      </Box>
    </Box>
  );
};

export default DashboardPage;
