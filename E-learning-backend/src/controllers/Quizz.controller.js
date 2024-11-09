import { Quizz } from "../modals/QuizzModel.js";

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quizz.find().populate("createdBy");
    return res.status(200).json(quizzes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createQuizze = async (req, res) => {
  try {
    // Check if the request body has questions
    if (req.body.questions && req.body.questions.length > 0) {
      // Insert the quiz data into the database
      const response = await Quizz.insertMany(req.body);
      
      // Send a success response with the inserted quiz data
      res.status(200).json({
        success: true,
        message: "Quiz created successfully",
        data: response,
      });
    } else {
      // If there are no questions, respond with a 400 Bad Request
      res.status(400).json({
        success: false,
        message: "Quiz must contain at least one question",
      });
    }
  } catch (error) {
    // Log the error and send a 500 Internal Server Error response
    console.error("Error while posting quiz:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the quiz",
      error: error.message,
    });
  }
};

