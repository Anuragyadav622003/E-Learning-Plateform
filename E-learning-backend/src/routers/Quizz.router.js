import express from 'express';
<<<<<<< HEAD:E-learning-backend/src/routers/Quizzes.js
import { createQuizze, getAllQuizzes } from '../controllers/QuizzesController.js';
=======
import { getAllQuizzes } from '../controllers/Quizz.controller.js';
>>>>>>> 9b8698da94d2ec8049c54281f3971dc36516e691:E-learning-backend/src/routers/Quizz.router.js
const router = express.Router();
//router.post('/quiz', quizController.createQuiz);         // Create a new quiz
router.get('/quizzes', getAllQuizzes);       // Get all quizzes
//router.get('/quiz/:id', quizController.getQuizById);     // Get a quiz by ID
//router.put('/quiz/:id', quizController.updateQuiz);      // Update a quiz by ID
//router.delete('/quiz/:id', quizController.deleteQuiz);   // Delete a quiz by ID

export default router;