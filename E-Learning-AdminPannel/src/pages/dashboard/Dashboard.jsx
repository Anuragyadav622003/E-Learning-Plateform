import React, { useEffect, useReducer, useState } from "react";
import DashboardCharts from "../../assets/Carts/DashboardCharts";
import { dashboard_User_Stats, dashboardData } from "./DashboardApi";

const initialState = {
  error: null,
  loading: true,
  dashboardData: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DASHBOARD_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_DASHBOARD_SUCCESS":
      return {
        ...state,
        loading: false,
        dashboardData: action.payload, // Set the fetched dashboard data
      };

    case "FETCH_DASHBOARD_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload, // Set the error message
      };

    default:
      return state; // Return the current state if no action matches
  }
};

const Dashboard = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchDashboardData = async () => {
      dispatch({ type: "FETCH_DASHBOARD_REQUEST" }); // Dispatch request action

      try {
        // Fetch dashboard data
        const dashboardResult = await dashboardData();
        console.log("Dashboard Data:", dashboardResult); // Log the result
        dispatch({ type: "FETCH_DASHBOARD_SUCCESS", payload: dashboardResult }); // Dispatch success action

        // Fetch user stats data
        // const userStatsResult = await dashboard_User_Stats();
        // console.log("User Stats Data:", userStatsResult); // Log the result

        // Handle user stats data if needed (you can update the state with it or use it directly)
      } catch (error) {
        dispatch({ type: "FETCH_DASHBOARD_FAILURE", payload: error.message }); // Dispatch failure action
      }
    };

    fetchDashboardData();
  }, []);

  if (state.loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl font-semibold text-blue-600">Loading...</div>
      </div>
    ); // Show loading state
  }

  if (state.error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl font-semibold text-red-600">
          Error: {state.error}
        </div>
      </div>
    ); // Show error message
  }

  //card
  const Card = (title, value) => (
    <div className="p-6 bg-white shadow-md rounded-lg dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-4xl font-bold">{value}</p>
    </div>
  );

  return (
    <div className="p-6">
      {" "}
      {/* Added padding for overall spacing */}
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
      {/* Stats Cards */}
      <div className="grid grid-cols-1  md:grid-cols-3 gap-6 mb-8">
        {Card("Total Courses", 12)}
        {Card("Total Quizzes", state.dashboardData.totalQuizzes || 0)}
        {Card("Total Students", state.dashboardData.totalStudents || 0)}

        {Card("Total Users", state.dashboardData.totalUsers || 0)}
        {Card("Total Admins", state.dashboardData.totalAdmins || 0)}
        {Card("Total Instructors", state.dashboardData.totalInstructors || 0)}

        {Card("Quizzes Created", state.dashboardData.quizzesCreated || 0)}
      </div>
      {/* Graph and Chart */}
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-6 mb-8">
        <DashboardCharts />
      </div>
      {/* Course Management Section */}
      <h2 className="text-xl font-semibold mb-4">Recent Courses</h2>
      <div className="bg-white p-6 shadow-md rounded-lg dark:bg-gray-800">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200   dark:bg-gray-900">
              <th className="p-3 text-left">Course Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Students Enrolled</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 text-left ">React for Beginners</td>
              <td className="p-3  text-left">Web Development</td>
              <td className="p-3  text-left">120</td>
              <td className="p-3  text-left">
                <button className="text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
            <tr>
              <td className="p-3">Introduction to Python</td>
              <td className="p-3">Programming</td>
              <td className="p-3">90</td>
              <td className="p-3">
                <button className="text-blue-500 hover:underline ">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
