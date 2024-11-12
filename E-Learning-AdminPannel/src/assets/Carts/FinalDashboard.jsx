import React from 'react';
import InstructorPerformanceRadar from './InstructorPerformanceRadar';
import CoursePopularityLineChart from './CoursePopularityLinChart';
import LearningPathProgressDoughnut from './LearningPathProgress';
import AssessmentPerformanceBar from './AssessmentPerformanceBar';
import StudentActivityPieChart from './StudentActivityPieChart';
import ActiveVsNewUsersLineChart from './ActiveVsNewUsersLineChart';
import UserChart from './ActiveUserNewUserCart';

const FinalDashboard = () => {
  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">E-Learning Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InstructorPerformanceRadar />
        <CoursePopularityLineChart />
        <LearningPathProgressDoughnut />
        <AssessmentPerformanceBar />
        <StudentActivityPieChart />
        <ActiveVsNewUsersLineChart />
     <UserChart/>
      </div>
    </div>
  );
};

export default FinalDashboard;
