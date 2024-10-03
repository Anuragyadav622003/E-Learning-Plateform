import React, { useState } from "react";

const Quizzes = () => {
  const [quiz, setQuiz] = useState({
    quizTitle: "",
    description: "",
    questions: [
      {
        questionText: "",
        options: ["", "", "", ""], // 4 empty options
        correctAnswerValue: "", // Store the correct answer value
      },
    ],
  });

  // Handle quiz title and description changes
  const handleQuizInfoChange = (field, value) => {
    setQuiz({ ...quiz, [field]: value });
  };

  // Handle question text change
  const handleQuestionChange = (index, value) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index].questionText = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  // Handle option text change
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  // Handle correct answer selection (store the value instead of index)
  const handleCorrectAnswerChange = (questionIndex, value) => {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex].correctAnswerValue = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  // Handle adding a new question
  const handleAddQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, { questionText: "", options: ["", "", "", ""], correctAnswerValue: "" }],
    });
  };

  // Handle removing a question
  const handleRemoveQuestion = (index) => {
    const newQuestions = quiz.questions.filter((_, i) => i !== index);
    setQuiz({ ...quiz, questions: newQuestions });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(quiz);
    // Perform API submission here with quiz object
  };

  return (
    <div className=" mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Create Quiz</h1>
      <form onSubmit={handleSubmit}>

        {/* Quiz Title */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Quiz Title</label>
          <input
            type="text"
            value={quiz.quizTitle}
            onChange={(e) => handleQuizInfoChange("quizTitle", e.target.value)}
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
            onChange={(e) => handleQuizInfoChange("description", e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter quiz description"
          />
        </div>

        {/* Questions */}
        {quiz.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold">Question {questionIndex + 1}</h4>
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
              value={question.questionText}
              onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
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
                    onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                    className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder={`Option ${optionIndex + 1}`}
                    required
                  />

                  {/* Correct Answer Radio */}
                  <label className="ml-4 flex items-center">
                    <input
                      type="radio"
                      name={`correctAnswer-${questionIndex}`}
                      checked={question.correctAnswerValue === option}
                      onChange={() => handleCorrectAnswerChange(questionIndex, option)}
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
          className="w-full mt-6 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-150"
        >
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default Quizzes;
