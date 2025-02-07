import React, { useEffect, useReducer, useState } from "react";
import { FaSearch, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { getAllCourses } from "./CourseApi"; // Fetch courses from API
import { useNavigate } from "react-router-dom";

// Loader Component
const Loader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 bg-opacity-50">
    <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
  </div>
);

const CoursesPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState(50);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initialFilters = {
    categoryList: [],
    difficultyList: [],
    minPrice: 0,
    maxPrice: 5000, // Default max price
  };

  const filterReducer = (state, action) => {
    switch (action.type) {
      case "set_category_list":
        return { ...state, categoryList: action.payload };
      case "set_difficulty_list":
        return { ...state, difficultyList: action.payload };
      case "set_price_range":
        return { ...state, minPrice: action.payload.min, maxPrice: action.payload.max };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(filterReducer, initialFilters);

  // Fetch Courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const resp = await getAllCourses(); // Fetch courses from API
        setCourses(resp);

        // Extract unique categories and difficulties
        const categoryList = [...new Set(resp.map((c) => c.category))];
        const difficultyList = [...new Set(resp.map((c) => c.level))];

        // Find min and max prices
        const prices = resp.map((c) => c.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        // Dispatch filter values
        dispatch({ type: "set_category_list", payload: categoryList });
        dispatch({ type: "set_difficulty_list", payload: difficultyList });
        dispatch({ type: "set_price_range", payload: { min: minPrice, max: maxPrice } });
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handlers
  const handlePriceChange = (e) => setPriceRange(e.target.value);
  const toggleCategory = (category) =>
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  const toggleDifficulty = (difficulty) =>
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty]
    );
  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  // Filtered Courses
  const filteredCourses = courses.filter(
    (course) =>
      (selectedCategories.length === 0 || selectedCategories.includes(course.category)) &&
      (selectedDifficulties.length === 0 || selectedDifficulties.includes(course.difficulty)) &&
      course.price <= priceRange &&
      course.title.toLowerCase().includes(searchTerm)
  );

  const handleStartLearning = (courseId) => {
    console.log(`Starting course with ID: ${courseId}`);
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="w-full bg-blue-500 dark:bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-semibold">Explore Courses</h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-4 relative">
        {loading && <Loader />} {/* Show Loader while fetching */}

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

        {/* Layout: Filters & Courses */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-1/4 bg-white dark:bg-gray-800 p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            {/* Category Filter */}
            <div>
              <h3 className="font-medium">Category</h3>
              <div className="space-y-2 mt-2">
                {state.categoryList.map((category) => (
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
                {state.difficultyList.map((difficulty) => (
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
                min={state.minPrice}
                max={state.maxPrice}
                value={priceRange}
                onChange={handlePriceChange}
                className="w-full"
              />
              <div className="text-sm mt-2 flex justify-between">
                <span>${state.minPrice}</span>
                <span>${priceRange}</span>
                <span>${state.maxPrice}</span>
              </div>
            </div>
          </aside>

          {/* Courses List */}
          <main className="flex-1 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course,index) => (
                <div key={course.id} className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-md flex flex-col">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-40 rounded-md object-cover" />
                  <h3 className="text-md font-semibold mt-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{course.category}</p>
                  <p className="mt-2 text-sm font-semibold">${course.price}</p>
                  <button
                    onClick={() => handleStartLearning(index)}
                    className="w-full text-sm bg-blue-500 dark:bg-blue-600 text-white py-2 mt-4 rounded-md"
                  >
                    Enroll Now
                  </button>
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
