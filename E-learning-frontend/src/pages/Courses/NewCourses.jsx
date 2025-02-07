import React, { useEffect, useReducer, useState } from "react";
import { FaSearch, FaStar, FaStarHalfAlt } from "react-icons/fa";
import  { getAllCourses } from "./CourseApi";  // Assuming you have a CourseApi.js file with your courses data
import { useNavigate } from "react-router-dom";

const CoursesPage = () => {
  const navigate = useNavigate();
  const[courses,setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState(50);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const initialFilters = {
      categoryList: [],
      defficultyList: [],
      minPrice: 0,
      maxPrice: 5000, // Example max price
    };
    
    const filterReducer = (state, action) => {
      switch (action.type) {
        case "set_category_list":
          return { ...state, categoryList: action.payload };  // Update only categoryList
        case "set_defficulty_list":
          return { ...state, defficultyList: action.payload };  // Update only deficultyList
          case "set_price_range":
            return { ...state, minPrice: action.payload.min, maxPrice: action.payload.max };
        default:
          return state;  // Return the current state if no action matches
      }
    };
    
    const [state, dispatch] = useReducer(filterReducer, initialFilters);
    
  

//fetch all courses
useEffect(() => {
  const fetchCourses = async () => {
    try {
      const resp = await getAllCourses();  // Fetch courses
     
      setCourses(resp);  // Store courses in state

      const cl = new Set(resp.map((c) => c.category));
      const dl = new Set(resp.map((c) => c.level));
      
      const priceRange = [Infinity, -Infinity]; // Initialize correctly
      
      resp.forEach((c) => {
        if (c.price < priceRange[0]) {
          priceRange[0] = c.price; // Update min price
        }
        if (c.price > priceRange[1]) {
          priceRange[1] = c.price; // Update max price
        }
      });
      
      // Convert Sets to arrays and dispatch them
      dispatch({ type: "set_category_list", payload: [...cl] });
      dispatch({ type: "set_defficulty_list", payload: [...dl] });
      dispatch({ type: "set_price_range", payload: { min: priceRange[0], max: priceRange[1] } });
      
 
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      setError("Failed to fetch quizzes.");
    } finally {
      setLoading(false);  // Stop loading spinner
    }
  };

  fetchCourses();
}, []);


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

  console.log(filteredCourses)
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
                {state.defficultyList.map((difficulty) => (
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
              <div className="w-full h-2 mt-2 bg-gray-300 dark:bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-blue-500 dark:bg-blue-600 rounded-full"
                  style={{ width: `${(priceRange / 100) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span>${state.minPrice}</span>
                <span>${priceRange}</span>
                <span>${state.maxPrice}</span>
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
                  <div className="w-full h-40  rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-full rounded-md w-full"
                    />
                  </div>
                  <h3 className="text-md font-semibold mt-2">{course.title}</h3>
                  {course.instructor?.username && <p className="text-sm text-gray-600 dark:text-gray-400">
                    Instructor: {course.instructor?.username}
                  </p>}
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {course.category}
                  </p>

                  <div className="flex items-center mt-2">

                {/* course rating  need to upade  */}
                    {[...Array(5)].map((_, i) =>
                      i < course.ratings[0]?.stars ? (
                        <FaStar key={i} className="text-sm text-yellow-500" />
                      ) : i === Math.floor(course.rating) ? (
                        <FaStarHalfAlt key={i} className="text-yellow-500" />
                      ) : (
                        <FaStar
                          key={i}
                          className="text-sm text-gray-300 dark:text-gray-500"
                        />
                      )
                    )}
                  </div>
                  <p className="mt-2 text-sm font-semibold">${course.price}</p>

                  {/* Push button to the bottom */}
                  <div className="mt-auto w-full">
                    <button
                      onClick={() => handleStartLearning(index)}
                      className="w-full text-sm bg-blue-500 dark:bg-blue-600 text-white py-2 mt-4 rounded-md"
                    >
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
