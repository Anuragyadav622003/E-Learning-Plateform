// charts/StudentActivityPieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StudentActivityPieChart = () => {
  const data = {
    labels: ['Lectures', 'Assignments', 'Quizzes', 'Discussions'],
    datasets: [
      {
        label: 'Student Activity Breakdown',
        data: [50, 20, 15, 15],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Student Activity Breakdown</h2>
      <Pie data={data} />
    </div>
  );
};

export default StudentActivityPieChart;
