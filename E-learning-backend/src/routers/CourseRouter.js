import express from 'express';
import { createCourse, getAllCourses } from '../controllers/CourseController.js';
import authorize from './AuthorizRouter.js';
const router  = express.Router();
router.post('/create',authorize,createCourse);

router.get('/AllCourses',authorize,getAllCourses);



export default router;

