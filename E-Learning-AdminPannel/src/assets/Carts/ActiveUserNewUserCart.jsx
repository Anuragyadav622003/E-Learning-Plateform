import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const ActiveUserNewUserCart = () => {
  const [timeFrame, setTimeFrame] = useState('weekly');

  // Sample data (replace with your dynamic data)
  const weeklyData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'New Users',
        data: [50, 70, 100, 120],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        type: 'bar',
      },
      {
        label: 'Active Users',
        data: [150, 200, 250, 300],
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        type: 'line',
      },
    ],
  };

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New Users',
        data: [300, 350, 400, 450, 500, 550, 600, 700, 800, 900, 1000, 1100],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        type: 'bar',
      },
      {
        label: 'Active Users',
        data: [1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600],
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        type: 'line',
      },
    ],
  };

  const yearlyData = {
    labels: ['2021', '2022', '2023'],
    datasets: [
      {
        label: 'New Users',
        data: [1500, 3000, 4500],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        type: 'bar',
      },
      {
        label: 'Active Users',
        data: [10000, 12000, 15000],
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        type: 'line',
      },
    ],
  };

  const data = timeFrame === 'weekly' ? weeklyData : timeFrame === 'monthly' ? monthlyData : yearlyData;

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows control over the height of the chart
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">User Statistics</h2>
        <select
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      
      <div className="w-full h-96">
        {/* Make chart responsive */}
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ActiveUserNewUserCart;
