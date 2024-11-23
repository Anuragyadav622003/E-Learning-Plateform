import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import coursesData from "./CourseApi";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = coursesData.find((course) => course.id == id);
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center">
        <p className="text-center text-3xl text-gray-500 mt-6">
          Course not found.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Section */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {course.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-400 mb-4">
              By: {course.instructor}
            </p>
            <p className="text-yellow-500 font-bold flex items-center mb-4">
              Rating: {course.rating.toFixed(1)} ⭐
            </p>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Back to Courses
            </button>
          </div>

          {/* Course Content Section */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {course.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-400 text-lg mb-6 leading-relaxed">
              {course.description}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              What You'll Learn
            </h2>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-400 mb-6 space-y-2">
              <li>Comprehensive understanding of {course.title}</li>
              <li>Hands-on exercises to solidify learning</li>
              <li>Real-world applications of skills</li>
              <li>Access to additional resources and materials</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Instructor Bio
            </h2>
            <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
              {course.instructor} is an experienced professional with over 10
              years in the industry. They have taught thousands of students and
              are passionate about sharing knowledge to help others grow.
            </p>

            <button className="mt-6 w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors duration-300"onClick={() => navigate(`/course/${course.id}/content`)}>
              Start Learning Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
