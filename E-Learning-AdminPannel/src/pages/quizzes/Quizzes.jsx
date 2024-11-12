import React, { useState } from "react";
import { createQuizz } from "./QuizzApi"; // Assuming this is your API function

const Quizzes = () => {
  const [quiz, setQuiz] = useState({
    title: "", // Quiz title
    description: "", // Quiz description
    category: "", // Quiz category (e.g., "Science", "Math")
    banner_url: "", // URL for the quiz banner
    questions: [
      {
        question: "", // Question text
        options: ["", "", "", ""], // Array of 4 options
        correctAnswer: "", // Correct answer (must match one of the options)
      },
    ],
  });

  const [error, setError] = useState(null); // For capturing and displaying errors
  const [loading, setLoading] = useState(false); // Loading state for form submission

  // Handle changes to quiz title, description, category, and banner URL
  const handleQuizInfoChange = (field, value) => {
    setQuiz({ ...quiz, [field]: value });
  };

  // Handle changes to question text
  const handleQuestionChange = (index, value) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index].question = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  // Handle changes to options
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  // Handle correct answer selection
  const handleCorrectAnswerChange = (questionIndex, value) => {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex].correctAnswer = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  // Add a new question to the quiz
  const handleAddQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { question: "", options: ["", "", "", ""], correctAnswer: "" },
      ],
    });
  };

  // Remove a question from the quiz
  const handleRemoveQuestion = (index) => {
    const newQuestions = quiz.questions.filter((_, i) => i !== index);
    setQuiz({ ...quiz, questions: newQuestions });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the submission process
    setError(null); // Clear any previous errors

    try {
      // Validate that at least one question exists
      if (quiz.questions.length === 0) {
        throw new Error("Please add at least one question to the quiz.");
      }

      // Validate that each question has all options and a correct answer
      for (const question of quiz.questions) {
        if (!question.question) {
          throw new Error("Each question must have a question text.");
        }

        if (question.options.some((option) => !option)) {
          throw new Error("Each question must have all 4 options filled.");
        }

        if (!question.correctAnswer) {
          throw new Error("Each question must have a correct answer.");
        }
      }

      // Perform the API call to create the quiz
      const response = await createQuizz(quiz); // Replace with your API call

      console.log("Quiz created successfully", response);
      alert("Quiz created successfully!");

      // Reset the form after successful submission
      setQuiz({
        title: "",
        description: "",
        category: "",
        banner_url: "",
        questions: [
          {
            question: "",
            options: ["", "", "", ""],
            correctAnswer: "",
          },
        ],
      });
    } catch (error) {
      console.error("Error creating quiz:", error);
      setError(error.message || "An error occurred while creating the quiz."); // Set error message
    } finally {
      setLoading(false); // Always stop loading when submission is complete
    }
  };

  return (
    <div className="mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Create Quiz</h1>

      {/* Display error if any */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
          <strong>Error: </strong> {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Quiz Title */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Quiz Title</label>
          <input
            type="text"
            value={quiz.title}
            onChange={(e) => handleQuizInfoChange("title", e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter quiz title"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Description</label>
          <textarea
            value={quiz.description}
            onChange={(e) =>
              handleQuizInfoChange("description", e.target.value)
            }
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter quiz description"
          />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Category</label>
          <input
            type="text"
            value={quiz.category}
            onChange={(e) => handleQuizInfoChange("category", e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter quiz category (e.g., 'Science', 'Math')"
          />
        </div>

        {/* Banner URL */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Banner URL</label>
          <input
            type="text"
            value={quiz.banner_url}
            onChange={(e) => handleQuizInfoChange("banner_url", e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter banner image URL"
          />
        </div>

        {/* Questions */}
        {quiz.questions.map((question, questionIndex) => (
          <div
            key={questionIndex}
            className="mb-8 bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold">
                Question {questionIndex + 1}
              </h4>
              {quiz.questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(questionIndex)}
                  className="text-red-600 font-semibold hover:underline"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Question Text */}
            <input
              type="text"
              value={question.question}
              onChange={(e) =>
                handleQuestionChange(questionIndex, e.target.value)
              }
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter question text"
              required
            />

            {/* Options */}
            <div>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(
                        questionIndex,
                        optionIndex,
                        e.target.value
                      )
                    }
                    className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder={`Option ${optionIndex + 1}`}
                    required
                  />

                  {/* Correct Answer Radio */}
                  <label className="ml-4 flex items-center">
                    <input
                      type="radio"
                      name={`correctAnswer-${questionIndex}`}
                      checked={question.correctAnswer === option}
                      onChange={() =>
                        handleCorrectAnswerChange(questionIndex, option)
                      }
                      className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2">Correct Answer</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Add Question Button */}
        <button
          type="button"
          onClick={handleAddQuestion}
          className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-150"
        >
          Add Question
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg mt-6 ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-indigo-700 transition duration-150"
          }`}
        >
          {loading ? "Submitting..." : "Create Quiz"}
        </button>
      </form>
    </div>
  );
};

export default Quizzes;
