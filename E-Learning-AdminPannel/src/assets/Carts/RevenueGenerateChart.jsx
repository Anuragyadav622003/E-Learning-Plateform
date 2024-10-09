import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler,
} from 'chart.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, Filler);

const RevenueProfitChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Total Revenue',
        data: [20000, 30000, 25000, 40000, 35000, 50000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        type: 'bar',
      },
      {
        label: 'Total Profit',
        data: [15000, 20000, 18000, 28000, 25000, 35000],
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        type: 'line',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        barPercentage: 0.5, // Adjust bar width (0.0 to 1.0)
        categoryPercentage: 0.5, // Adjust space per category
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount ($)',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: $${context.parsed.y}`;
          },
        },
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full h-64 md:h-96 lg:h-[30rem] flex flex-col">
      <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">Revenue and Profit Overview</h2>
      <div className="flex-1 w-full h-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default RevenueProfitChart;
