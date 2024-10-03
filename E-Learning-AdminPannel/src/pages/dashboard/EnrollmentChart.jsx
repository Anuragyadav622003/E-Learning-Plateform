// src/components/EnrollmentChart.js

import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

const EnrollmentChart = () => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    // Sample data for the chart
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Students Enrolled',
                data: [50, 100, 75, 125, 200, 150],
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 1)',
                borderColor: 'rgba(75, 192, 192, 0.5)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Student Enrollment Over Time',
            },
        },
    };

    useEffect(() => {
        // Ensure previous chart instance is destroyed
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        // Create new chart instance
        const chartInstance = new ChartJS(chartRef.current, {
            type: 'line',
            data: data,
            options: options,
        });

        chartInstanceRef.current = chartInstance; // Save the chart instance for cleanup

        return () => {
            // Cleanup on unmount
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data, options]); // Re-run effect if data or options change

    return <canvas ref={chartRef} />;
};

export default EnrollmentChart;
