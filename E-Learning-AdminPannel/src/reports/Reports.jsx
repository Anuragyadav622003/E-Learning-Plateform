// src/components/ReportPage.js

import React from 'react';

const ReportPage = () => {
    const userEngagementData = {
        activeUsers: 1200,
        newEnrollments: 350,
        courseCompletionRate: 75, // percentage
    };

    const coursePerformanceData = {
        mostPopularCourses: [
            { title: 'JavaScript Basics', enrollments: 500, rating: 4.8 },
            { title: 'React for Beginners', enrollments: 300, rating: 4.5 },
        ],
    };

    const financialData = {
        totalRevenue: 15000, // in USD
        refunds: 200,
        successfulPayments: 320,
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Reports Dashboard</h2>

            {/* User Engagement Section */}
            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">User Engagement</h3>
                <p>Active Users: {userEngagementData.activeUsers}</p>
                <p>New Enrollments: {userEngagementData.newEnrollments}</p>
                <p>Course Completion Rate: {userEngagementData.courseCompletionRate}%</p>
            </section>

            {/* Course Performance Section */}
            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Course Performance</h3>
                <ul>
                    {coursePerformanceData.mostPopularCourses.map((course, index) => (
                        <li key={index}>
                            {course.title} - Enrollments: {course.enrollments} - Rating: {course.rating}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Financial Section */}
            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Financial Overview</h3>
                <p>Total Revenue: ${financialData.totalRevenue}</p>
                <p>Refunds: ${financialData.refunds}</p>
                <p>Successful Payments: {financialData.successfulPayments}</p>
            </section>
        </div>
    );
};

export default ReportPage;
