import React, { useState,useReducer,useEffect } from "react";
import { FaSearch, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { getQuizzes } from "./QuizzApi";
import { useNavigate } from "react-router-dom";

const ExploreQuizzesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState(50);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [quizzes,setQuizzes] = useState([]);
  const navigate = useNavigate();

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
      
    
  const demoQuizzes = [
    {
      id: 1,
      title: "Basic Science Quiz",
      description: "Test your knowledge in basic science concepts.",
      category: "Science",
      difficulty: "Beginner",
      price: 10,
      image: "https://via.placeholder.com/400x200?text=Basic+Science+Quiz",
    },
    {
      id: 2,
      title: "Advanced Technology Quiz",
      description: "Are you up-to-date with the latest tech trends?",
      category: "Technology",
      difficulty: "Advanced",
      price: 25,
      image: "https://via.placeholder.com/400x200?text=Advanced+Technology+Quiz",
    },
    {
      id: 3,
      title: "Math Fundamentals Quiz",
      description: "Sharpen your basic math skills.",
      category: "Math",
      difficulty: "Intermediate",
      price: 15,
      image: "https://via.placeholder.com/400x200?text=Math+Fundamentals+Quiz",
    },
    {
      id: 4,
      title: "History of the World Quiz",
      description: "Challenge yourself on world history facts.",
      category: "History",
      difficulty: "Intermediate",
      price: 20,
      rating:3,
      image: "https://via.placeholder.com/400x200?text=History+of+the+World+Quiz",
    },
    {
      id: 5,
      title: "Art and Culture Quiz",
      description: "Test your knowledge on art and cultural heritage.",
      category: "Arts",
      difficulty: "Beginner",
      price: 5,
      image: "https://via.placeholder.com/400x200?text=Art+and+Culture+Quiz",
    },
    // Add more quizzes here if needed
  ];

    // useEffect(() => {
    //   const fetchQuizzes = async () => {
    //     try {
    //       const resp = await getQuizzes(); 
        
    //       setQuizzes(resp);
    //     } catch (error) {
    //       console.error("Error fetching quizzes:", error);
    //       setError("Failed to fetch quizzes.");
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
  
    //   fetchQuizzes();
    // }, []);

    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const resp = await getQuizzes(); ;  // Fetch courses
         
          setQuizzes(resp);  
    
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
          // setError("Failed to fetch quizzes.");
        } finally {
          // setLoading(false);  // Stop loading spinner
        }
      };
    
      fetchCourses();
    }, []);
    console.log(quizzes)
  
  
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

  const filteredQuizzes = quizzes.filter(
    (quiz) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(quiz.category)) &&
      (selectedDifficulties.length === 0 ||
        selectedDifficulties.includes(quiz.difficulty))  &&
        (quiz.title?.toLowerCase().includes(searchTerm) ||
    quiz.description?.toLowerCase().includes(searchTerm) ||
    quiz.category?.toLowerCase().includes(searchTerm))
  
  );
console.log(filteredQuizzes ,"hhgh");
  const handleStartQuiz = (quizId) => {
    console.log(`Starting quiz with ID: ${quizId}`);
    navigate(`/quizzes/${quizId}`); // Navigates to the quiz details page
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="w-full bg-blue-500 dark:bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-semibold">Explore Quizzes</h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md text-gray-900 dark:text-gray-200"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>
        </div>

        {/* Main Layout: Filters and Quiz Cards */}
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
            {state.difficulty  && 
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
}

            {/* Price Range Filter */}
            {state.priceRange   && 
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
}
          </aside>

          {/* Quiz Cards */}
          <main className="flex-1 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.map((quiz, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-md flex flex-col h-full"
                >
                  <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                
                    <img
                      src={quiz.banner_url}
                      alt=""
                      className="h-full rounded-md"
                    />
                  </div>
                  <h3 className="text-md font-semibold mt-2">{quiz.title}</h3>
                  <p className=" text-sm text-gray-600 dark:text-gray-400">
                  {quiz.description} 
                  </p>
                  <p className=" text-sm text-gray-600 dark:text-gray-400">
                  Category: {quiz.category}
                  </p>
                
                  <p className=" text-sm text-gray-600 dark:text-gray-400">
                    {/* Difficulty: {quiz.difficulty} */}
                  </p>

                  <div className="flex items-center mt-2">
                    {/* {[...Array(5)].map((_, i) =>
                      i < quiz.rating ? (
                        <FaStar key={i} className="text-yellow-500" />
                      ) : i === Math.floor(quiz.rating) ? (
                        <FaStarHalfAlt key={i} className="text-yellow-500" />
                      ) : (
                        <FaStar
                          key={i}
                          className="text-gray-300 dark:text-gray-500"
                        />
                      )
                    )} */}
                  </div>
                  {/* <p className="mt-2 font-semibold">${quiz.price}</p> */}

                  {/* Button to start quiz */}
                  <div className="mt-auto w-full">
                    <button
                      onClick={() => handleStartQuiz(index)}
                      className="w-full bg-blue-500 dark:bg-blue-600 text-white py-2 mt-4 rounded-md"
                    >
                      Start Quiz
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

export default ExploreQuizzesPage;
