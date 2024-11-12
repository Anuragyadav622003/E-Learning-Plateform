// charts/LearningPathProgressDoughnut.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const LearningPathProgressDoughnut = () => {
  const data = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
      {
        label: 'Learning Path Progress',
        data: [40, 30, 30],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Learning Path Progress</h2>
      <Doughnut data={data} />
    </div>
  );
};

export default LearningPathProgressDoughnut;
