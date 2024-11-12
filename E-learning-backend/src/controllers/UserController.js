import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../modals/UserModel.js"; // Corrected spelling of 'models'
import { uploadOnCloud } from "../utils/cloudinary.util.js";

// Ensure dotenv is configured in your server entry file
const secretKey = process.env.SECRET_KEY || "ELearning"; // Consistent secret key

// Generate Access and Refresh Tokens
const generateAccessRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();  // Ensure these methods exist in your User model
    const refreshToken = user.refreshAccessToken();  // Ensure these methods exist in your User model
    
    // Save refreshToken to the user document
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new Error("Error generating tokens");
  }
};

// Register a new user
export const registerUser = async (req, res) => {
  const {
    username,
    email,
    password,
    mobileNumber,
    gender,
    role,
  } = req.body;

  // Validate required fields
  if (!username || !email || !password || !mobileNumber || !gender || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const profileLocalPath = req.files?.profileimage?.[0]?.path;

  try {
    // Check if email or mobile number already exists
    const existingUser = await User.findOne({ $or: [{ email }, { mobileNumber }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or mobile number already registered" });
    }

    // Hash the password manually using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password here

    // Check if profile image exists and upload if provided
    let profileImageUrl = "";
    if (profileLocalPath) {
      // Upload profile image to cloud if provided
      const profileImage = await uploadOnCloud(profileLocalPath);
      if (!profileImage) {
        return res.status(400).json({ message: "Image upload failed" });
      }
      profileImageUrl = profileImage.secure_url; // Get the URL after upload
    }

    // Create new user with hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Save the hashed password
      mobileNumber,
      gender,
      role,
      profileImage: profileImageUrl, // Use uploaded image URL or empty string if not provided
    });

    await newUser.save(); // Save the user to the database

    // Return success response
    return res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Error in user registration:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email })
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = await generateAccessRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({
        user: loggedInUser,
        accessToken,
        refreshToken,
        message: "User logged in successfully",
      });
  } catch (error) {
    console.error("Error in user login:", error.message || error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Logout a user
export const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure secure flag in production
    };

    return res
      .status(200)
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error in user logout:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
