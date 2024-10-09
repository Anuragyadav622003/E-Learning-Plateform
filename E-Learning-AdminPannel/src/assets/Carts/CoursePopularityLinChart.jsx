// charts/CoursePopularityLineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CoursePopularityLineChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'HTML & CSS',
        data: [300, 400, 350, 500, 550, 600],
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'JavaScript',
        data: [200, 300, 250, 350, 400, 500],
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Course Popularity Over Time</h2>
      <Line data={data} />
    </div>
  );
};

export default CoursePopularityLineChart;
