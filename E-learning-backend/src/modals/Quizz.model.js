import mongoose from 'mongoose';
import User from './User.model.js';
// Quiz Schema (supports multiple quizzes)
const quizSchema = new mongoose.Schema({
  title: String,        // Title of the quiz
  description: String,  // Description of the quiz
  category: String,   
  banner_url: String,
                     // Quiz category (optional, e.g., "Science", "Math")
  questions: [
    {
      question: String,        // Quiz question
      options: [String],       // Options for the question
      correctAnswer: String,   // The correct answer for the question
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // The creator of the quiz (admin, etc.)
});

// User Quiz Result Schema (tracks the user's attempts and results for specific quizzes)
const userQuizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },       // Reference to the user taking the quiz
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },       // Reference to the quiz taken
  score: Number,                                                       // User's score on the quiz
  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId,   // Reference to the specific question
      selectedAnswer: String,                       // User's selected answer
      isCorrect: Boolean,                           // Whether the answer was correct or not
    },
  ],
  dateTaken: { type: Date, default: Date.now },                         // Date the quiz was taken
});
 
const Quizz = mongoose.model('Quiz', quizSchema);
const UserQuizResult = mongoose.model('UserQuizResult', userQuizResultSchema);

export {  Quizz, UserQuizResult };
