import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizzes } from "./QuizzApi";

function QuizSolution() {
  const { id } = useParams(); // Extract the `id` from URL params
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const resp = await getQuizzes(); // Fetch all quizzes
        const selectedQuiz = resp.find((quiz, index) => index === parseInt(id)); // Match quiz by index
        if (selectedQuiz) {
          setQuizData(selectedQuiz);
        } else {
          console.error("Quiz not found.");
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuiz();
  }, [id]);

  if (!quizData) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between min-h-screen p-4 sm:p-6 md:p-8 lg:p-12 bg-gray-100 dark:bg-gray-800">
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">
          {quizData.title} - Solutions
        </h1>
        <p className="text-base sm:text-lg md:text-xl mt-2 text-gray-700 dark:text-gray-300">
          Below are the correct answers and explanations.
        </p>
      </div>
      
      <div className="space-y-6">
        {quizData.questions.map((question, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-700 dark:text-white">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">
              {index + 1}. {question.question}
            </h3>
            <ul className="options-list list-none pl-0">
              {question.options.map((option, optionIndex) => (
                <li
                  key={optionIndex}
                  className={`flex items-center my-4 p-4 border rounded-md ${
                    option === question.correctAnswer
                      ? "bg-green-100 dark:bg-green-600"
                      : option === question.selectedAnswer
                      ? "bg-red-100 dark:bg-red-600"
                      : "hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                >
                  <span
                    className={`ml-4 text-base sm:text-lg md:text-xl font-medium ${
                      option === question.correctAnswer
                        ? "text-green-600 dark:text-green-400"
                        : option === question.selectedAnswer
                        ? "text-red-600 dark:text-red-400"
                        : "text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {option}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-md sm:text-lg mt-4 text-gray-500 dark:text-gray-400">
              <strong>Explanation:</strong> {question.explanation || "No explanation available."}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out dark:bg-indigo-700 dark:hover:bg-indigo-800"
          onClick={() => navigate(`/quizzes`)} // Navigate back to the quiz list or dashboard
        >
          Back to Quizzes
        </button>
      </div>
    </div>
  );
}

export default QuizSolution;
