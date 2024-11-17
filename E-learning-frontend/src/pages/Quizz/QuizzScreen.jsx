import React, { useEffect, useState, useCallback } from "react";
import { getQuizzes } from "./QuizzApi";
import { useNavigate } from "react-router-dom";
import QuizzNav from "./QuizzNav";
import { authorize } from "../../componenet/Authorize";

const QuizzScreen = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  const memoizedSetQuizzes = useCallback((newQuizzes) => {
    setQuizzes(newQuizzes);
  }, []);

 // Check authorization on component mount
  // useEffect(() => {
  //   const checkAuthorization = async () => {
  //     try {
  //       const response = await Authorize();
  //       if (response) {
  //         setIsAuthorized(true);
  //       }
  //     } catch (error) {
  //       console.error("Authorization failed:", error);
  //       setIsAuthorized(false);
  //       navigate("/login"); // Redirect to login if authorization fails
  //     }
  //   };

  //   checkAuthorization();
  // }, [navigate]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const resp = await getQuizzes();
        memoizedSetQuizzes(resp);
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
      <div className="flex justify-center items-center min-h-screen dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-gray-900">
        <p className="text-red-500 dark:text-red-400 text-lg">{error}</p>
      </div>
    );
  }

  const filteredQuizzes = quizzes.filter((quiz) => {
    const query = searchQuery.toLowerCase();
    return (
      quiz.title.toLowerCase().includes(query) ||
      quiz.description.toLowerCase().includes(query) ||
      quiz.category.toLowerCase().includes(query)
    );
  });

  const handleClick = async(quiz) => {
    localStorage.setItem("quizzToPlay", JSON.stringify(quiz));
    try {
      const response = await authorize();
      if(response){
        localStorage.setItem("quizzToPlay", JSON.stringify(quiz));
        navigate("/quizzPlay");
      }
      else{
        navigate('/login');
      }
     } catch (error) {
     console.log(error,"Authorization faild");
     }
    navigate("/quizzPlay");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">All Quizzes</h1>

          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search for quizzes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-black max-w-md px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredQuizzes.map((quiz, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 flex flex-col h-full"
              >
                <img className="w-full h-40 object-cover" src={quiz.banner_url} alt={quiz.title} />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{quiz.title}</h2>
                    <p className="text-gray-700 dark:text-gray-400 mb-2">{quiz.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Category: {quiz.category}</p>
                  </div>
                  <div>
                    <button
                      className="mt-4 w-full bg-blue-500 dark:bg-blue-600 text-white py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300"
                      onClick={() => handleClick(quiz)}
                    >
                      Start Quiz
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredQuizzes.length === 0 && (
            <p className="text-center text-gray-500 mt-6">No quizzes found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizzScreen;
