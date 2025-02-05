import React, { useState } from "react";
import { FaSearch, FaStar, FaStarHalfAlt } from "react-icons/fa";
import courses from "./CourseApi";
import { useNavigate } from "react-router-dom";
const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState(50);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const navigate = useNavigate();

 

  const handlePriceChange = (e) => setPriceRange(e.target.value);
  const toggleCategory = (category) =>
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  const toggleDifficulty = (difficulty) =>
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.filter((diff) => diff !== difficulty)
        : [...prev, difficulty]
    );
  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredCourses = courses.filter(
    (course) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(course.category)) &&
      (selectedDifficulties.length === 0 ||
        selectedDifficulties.includes(course.difficulty)) &&
      course.price <= priceRange &&
      course.title.toLowerCase().includes(searchTerm)
  );

  const handleStartLearning = (courseId) => {
    console.log(`Starting course with ID: ${courseId}`);
    navigate(`/course/${courseId}`); // Navigates to the course details page
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="w-full bg-blue-500 dark:bg-gray-900 text-white p-6">
  <h1 className="text-3xl font-semibold">Explore Courses</h1>
</header>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md text-gray-900 dark:text-gray-200"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>
        </div>

        {/* Main Layout: Filters and Course Cards */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-1/4 bg-white dark:bg-gray-800 p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            {/* Category Filter */}
            <div>
              <h3 className="font-medium">Category</h3>
              <div className="space-y-2 mt-2">
                {[
                  "Web Development",
                  "Programming",
                  "Data Science",
                  "Design",
                ].map((category) => (
                  <label key={category} className="block">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="mt-4">
              <h3 className="font-medium">Difficulty</h3>
              <div className="space-y-2 mt-2">
                {["Beginner", "Intermediate", "Advanced"].map((difficulty) => (
                  <label key={difficulty} className="block">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedDifficulties.includes(difficulty)}
                      onChange={() => toggleDifficulty(difficulty)}
                    />
                    {difficulty}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mt-4">
              <h3 className="font-medium">Price Range</h3>
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange}
                onChange={handlePriceChange}
                className="w-full"
              />
              <div className="w-full h-2 mt-2 bg-gray-300 dark:bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-blue-500 dark:bg-blue-600 rounded-full"
                  style={{ width: `${(priceRange / 100) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span>$0</span>
                <span>${priceRange}</span>
                <span>$100</span>
              </div>
            </div>
          </aside>

          {/* Course Cards */}
          <main className="flex-1 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-md flex flex-col h-full"
                >
                  <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <img
                      src={course.image}
                      alt=""
                      className="h-full rounded-md"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mt-2">{course.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Instructor: {course.instructor}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {course.category}
                  </p>

                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) =>
                      i < course.rating ? (
                        <FaStar key={i} className="text-yellow-500" />
                      ) : i === Math.floor(course.rating) ? (
                        <FaStarHalfAlt key={i} className="text-yellow-500" />
                      ) : (
                        <FaStar
                          key={i}
                          className="text-gray-300 dark:text-gray-500"
                        />
                      )
                    )}
                  </div>
                  <p className="mt-2 font-semibold">${course.price}</p>

                  {/* Push button to the bottom */}
                  <div className="mt-auto w-full">
                    <button   onClick={() => handleStartLearning(course.id)} className="w-full bg-blue-500 dark:bg-blue-600 text-white py-2 mt-4 rounded-md">
                      Enroll Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
