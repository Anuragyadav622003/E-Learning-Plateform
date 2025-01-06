import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa"; // Importing stars from react-icons
import coursesData from "./CourseApi"; // Import course data
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Filter courses based on the search query
  const filteredCourses = coursesData.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to render rating stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={`full-${index}`} className="text-yellow-500" />
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={`empty-${index}`} className="text-gray-400" />
        ))}
      </>
    );
  };

  const handleStartLearning = (courseId) => {
    console.log(`Starting course with ID: ${courseId}`);
    navigate(`/course/${courseId}`); // Navigates to the course details page
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
     

        {/* Main Layout: Filters + Courses */}
        <div className="flex">
          {/* Left Filter Section */}
          <aside className="w-1/4 hidden lg:block bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mr-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Filters
            </h2>
            <div className="space-y-4">
              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  Categories
                </h3>
                <ul className="space-y-2">
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox text-blue-500 dark:text-blue-400"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-400">
                        Development
                      </span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox text-blue-500 dark:text-blue-400"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-400">
                        Design
                      </span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox text-blue-500 dark:text-blue-400"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-400">
                        Business
                      </span>
                    </label>
                  </li>
                </ul>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  Rating
                </h3>
                <ul className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <li key={rating}>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="form-checkbox text-blue-500 dark:text-blue-400"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-400">
                          {renderStars(rating)} & Up
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Duration Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  Duration
                </h3>
                <ul className="space-y-2">
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox text-blue-500 dark:text-blue-400"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-400">
                        Less than 5 hours
                      </span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox text-blue-500 dark:text-blue-400"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-400">
                        5-10 hours
                      </span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox text-blue-500 dark:text-blue-400"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-400">
                        More than 10 hours
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Courses Grid */}
          <div className="w-full lg:w-3/4">
            {/* Search Bar */}
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Our Courses
        </h1>
            <div className="flex justify-center mb-6">
              
              <input
                type="text"
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md text-gray-950 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Courses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 flex flex-col"
                >
                  <img
                    src={course.image || "default-course-image.jpg"}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                        {course.title}
                      </h2>
                      <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                        {course.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Instructor: {course.instructor}
                      </p>
                    </div>
                    <div className="mt-4">
                      <p className="text-yellow-500 font-bold flex items-center text-sm">
                        {renderStars(course.rating)} ({course.rating})
                      </p>
                      <button
                        onClick={() => handleStartLearning(course.id)}
                        className="mt-4 w-full bg-blue-500 dark:bg-blue-600 text-white py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300"
                      >
                        Start Learning
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {filteredCourses.length === 0 && (
              <p className="text-center text-gray-500 mt-6">No courses found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
