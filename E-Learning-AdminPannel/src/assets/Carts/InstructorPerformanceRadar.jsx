// charts/InstructorPerformanceRadar.js
import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const InstructorPerformanceRadar = () => {
  const data = {
    labels: ['Course Ratings', 'Completion Rate', 'Student Feedback', 'Enrollment Count'],
    datasets: [
      {
        label: 'Instructor A',
        data: [85, 70, 90, 60],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      },
      {
        label: 'Instructor B',
        data: [75, 80, 70, 90],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Instructor Performance</h2>
      <Radar data={data} />
    </div>
  );
};

export default InstructorPerformanceRadar;
