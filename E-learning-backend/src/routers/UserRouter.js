// routes/userRoutes.js
import express from "express";
import loginSchema from "../../validator/login-validator.js";
import signupSchema from "../../validator/signup-validator.js";

import { login, register } from "../controllers/UserController.js";
import upload from "../middlewares/multer.middleware.js";
import validate from "./../middlewares/validate-middleware.js";

const router = express.Router();


// Register route
router.post(
  "/register",
  upload.fields([{ name: "profileimage", maxCount: 1 }]),
  validate(signupSchema),
  register
);

// Login route
router.post("/login", validate(loginSchema), login);

export default router;
