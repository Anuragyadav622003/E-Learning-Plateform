import express from 'express';

import{ createQuizze, getAllQuizzes } from '../controllers/Quizz.controller.js';
const router = express.Router();
//router.post('/quiz', quizController.createQuiz);         // Create a new quiz
router.get('/quizzes', getAllQuizzes);       // Get all quizzes
//router.get('/quiz/:id', quizController.getQuizById);     // Get a quiz by ID
//router.put('/quiz/:id', quizController.updateQuiz);      // Update a quiz by ID
//router.delete('/quiz/:id', quizController.deleteQuiz);   // Delete a quiz by ID

export default router;