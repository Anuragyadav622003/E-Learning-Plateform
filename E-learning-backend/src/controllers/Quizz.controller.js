import { Quizz } from "../modals/Quizz.model.js";

export const getAllQuizzes = async (req, res) => {
    try {
      const quizzes = await Quizz.find().populate('createdBy');
      return res.status(200).json(quizzes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };