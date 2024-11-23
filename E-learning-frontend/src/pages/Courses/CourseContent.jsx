import React from "react";
import { useParams } from "react-router-dom";
import coursesData from "./CourseApi";

const CourseContent = () => {
  const { id } = useParams();
  const course = coursesData.find((course) => course.id === parseInt(id));

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
        <p className="text-center text-gray-500 mt-6">Course not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {course.title} - Course Content
        </h1>

        {/* Video Player */}
        <div className="mb-6">
          <video
            src="https://www.w3schools.com/html/mov_bbb.mp4" // Replace with actual video link
            controls
            className="w-full h-64 rounded-lg shadow-lg"
          ></video>
        </div>

        {/* Course Modules */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Modules
        </h2>
        <ul className="list-decimal pl-5 text-gray-700 dark:text-gray-400 space-y-3">
          <li>Introduction to the Course</li>
          <li>Understanding the Basics</li>
          <li>Hands-on Exercise 1</li>
          <li>Advanced Techniques</li>
          <li>Conclusion and Next Steps</li>
        </ul>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
            Previous
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300">
            Next
          </button>
        </div>
      </div>
      <div className="container ">

      </div>
    </div>
  );
};

export default CourseContent;
