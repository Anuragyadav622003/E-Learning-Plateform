import React, { useEffect, useState, useCallback } from "react";
import { getQuizzes } from "./QuizzApi"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";
import QuizzNav from "./QuizzNav";

const QuizzScreen = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const navigate = useNavigate();

  // Memoize setQuizzes function to prevent unnecessary re-renders
  const memoizedSetQuizzes = useCallback((newQuizzes) => {
    setQuizzes(newQuizzes);
  }, []);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const resp = await getQuizzes();
        memoizedSetQuizzes(resp); // Use the memoized function
      } catch (error) {
        setError("Failed to fetch quizzes.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [memoizedSetQuizzes]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  // Filter quizzes based on the search query
  const filteredQuizzes = quizzes.filter((quiz) => {
    const query = searchQuery.toLowerCase();
    return (
      quiz.title.toLowerCase().includes(query) ||
      quiz.description.toLowerCase().includes(query) ||
      quiz.category.toLowerCase().includes(query)
    );
  });

  const handleClick = (quiz) => {
    localStorage.setItem("quizzToPlay", JSON.stringify(quiz));
    navigate("/quizzPlay");
  };

  return (
    <>
      {/* Pass searchQuery and setSearchQuery to QuizzNav */}
      <QuizzNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">All Quizzes</h1>

        {/* Display Filtered Quizzes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredQuizzes.map((quiz, index) => (
            <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
              <img className="w-full" src={quiz.banner_url} alt={quiz.title} />
              <div className="px-6 py-4">
                <h2 className="font-bold text-xl mb-2">{quiz.title}</h2>
                <p className="text-gray-700 text-base mb-2">{quiz.description}</p>
                <p className="text-gray-500 text-sm">Category: {quiz.category}</p>
              </div>
              <div className="px-6 py-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                  onClick={() => handleClick(quiz)}
                >
                  Start Quiz
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredQuizzes.length === 0 && (
          <p className="text-center text-gray-500">No quizzes found.</p>
        )}
      </div>
    </>
  );
};

export default QuizzScreen;
 