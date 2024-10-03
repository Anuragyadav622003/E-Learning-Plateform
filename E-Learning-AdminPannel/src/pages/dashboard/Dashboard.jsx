import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
   


        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Courses</h3>
          <p className="text-4xl font-bold">12</p>
        </div>

        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Quizzes</h3>
          <p className="text-4xl font-bold">45</p>
        </div>

        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Students</h3>
          <p className="text-4xl font-bold">150</p>
        </div>
      </div>

      {/* Course Management Section */}
      <h2 className="text-xl font-semibold mb-4">Recent Courses</h2>
      <div className="bg-white p-6 shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Course Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Students Enrolled</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3">React for Beginners</td>
              <td className="p-3">Web Development</td>
              <td className="p-3">120</td>
              <td className="p-3">
                <button className="text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
            <tr>
              <td className="p-3">Introduction to Python</td>
              <td className="p-3">Programming</td>
              <td className="p-3">90</td>
              <td className="p-3">
                <button className="text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
