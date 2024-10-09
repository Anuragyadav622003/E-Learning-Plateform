// charts/ActiveVsNewUsersLineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ActiveVsNewUsersLineChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Active Users',
        data: [500, 600, 700, 800, 900, 1000],
        borderColor: '#36A2EB',
        fill: false,
      },
      {
        label: 'New Users',
        data: [100, 200, 300, 400, 500, 600],
        borderColor: '#FF6384',
        fill: false,
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Active Users vs New Users</h2>
      <Line data={data} />
    </div>
  );
};

export default ActiveVsNewUsersLineChart;
