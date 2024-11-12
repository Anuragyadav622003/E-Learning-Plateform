import express from 'express';
import { getDashboardData, getUserStatistics } from '../controllers/DashboardController.js';

const router = express.Router();
router.get('/dashboard',getDashboardData);
router.get('/user-stats',getUserStatistics);
export default router;