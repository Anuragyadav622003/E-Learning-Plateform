import express from 'express';
import { createCourse, getAllCourses,updateCourseInteraction } from '../controllers/CourseController.js';
import { authorize } from "./AuthorizRouter.js";
const router  = express.Router();
// ✅ Create a Course (Protected Route)
router.post("/create", authorize, createCourse);

// ✅ Get All Courses
router.get("/allCourses", getAllCourses);

// ✅ Rate / Like / Unlike Course (Combined Controller)
router.put("/:courseId/interact", authorize, updateCourseInteraction);


export default router;

