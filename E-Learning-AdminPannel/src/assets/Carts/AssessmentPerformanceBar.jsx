// charts/AssessmentPerformanceBar.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AssessmentPerformanceBar = () => {
  const data = {
    labels: ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Final Exam'],
    datasets: [
      {
        label: 'Passed',
        data: [50, 60, 55, 80],
        backgroundColor: '#4BC0C0',
      },
      {
        label: 'Failed',
        data: [10, 15, 10, 5],
        backgroundColor: '#FF6384',
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Assessment Performance</h2>
      <Bar data={data} options={{ scales: { y: { beginAtZero: true } }, indexAxis: 'y' }} />
    </div>
  );
};

export default AssessmentPerformanceBar;
