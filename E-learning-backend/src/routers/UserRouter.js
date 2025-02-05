import express from "express";
import loginSchema from "../../validator/login-validator.js";
import signupSchema from "../../validator/signup-validator.js";
import { login, register, userProfile } from "../controllers/UserController.js";
import upload from "../utils/multer.js";
import validate from "../middlewares/validate-midleware.js";
import { authorize } from "./AuthorizRouter.js";

const router = express.Router();

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// user data
router.get("/profile",authorize,userProfile);

export default router;