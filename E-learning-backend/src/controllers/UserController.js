import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../modals/UserModel.js"; // Corrected 'modals' to 'models'
import cloudinary from "../utils/cloudinary.js";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

// Generate Access and Refresh Tokens
const generateAccessRefreshTokens = async (user) => {
  try {
    const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_EXPIRATION, { expiresIn: "7d" });
    
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new Error("Error generating tokens");
  }
};

export const register = async (req, res) => {
  try {
    console.log("Register Request:", req.body);

    const { username, email, password, mobileNumber, gender, role } = req.body;

    if (!username || !email || !password || !mobileNumber || !gender || !role) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if email or mobile number already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ msg: "Email already registered" });
    }
    if (await User.findOne({ mobileNumber })) {
      return res.status(400).json({ msg: "Phone already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle profile image upload if provided
    let profileImageUrl = "";
    if (req.files?.profileimage?.[0]?.path) {
      const uploadResponse = await cloudinary.uploader.upload(req.files.profileimage[0].path);
      if (!uploadResponse) {
        return res.status(400).json({ msg: "Image upload failed" });
      }
      profileImageUrl = uploadResponse.secure_url;
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      mobileNumber,
      gender,
      role,
      profileImage: profileImageUrl,
    });

    await newUser.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
   
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    console.log(user)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = await generateAccessRefreshTokens(user);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    console.log(accessToken,refreshToken)
    res.status(200)
      .cookie("accessToken", accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 86400000 })
      .cookie("refreshToken", refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 604800000 })
      .json({ user: loggedInUser, accessToken, refreshToken, msg: "User logged in successfully" });
  } catch (error) {
    console.error("Error in user login:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

export const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in fetching user profile:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Function to delete all users (for testing purposes only)
const deleteUser = async () => {
  try {
    await User.deleteMany();
    console.log("All users deleted successfully");
  } catch (error) {
    console.error("Error deleting users:", error);
  }
};
// Uncomment below line to use (Be cautious!)
// deleteUser();



//google auth

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// Google Login Controller
export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body; // Frontend sends Google ID token
    console.log(token,"sd")
    if (!token) {
      return res.status(400).json({ msg: "Google token is required" });
    }

    // Verify Google ID Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture, sub: googleId } = ticket.getPayload();

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Register new user
      user = new User({
        username: name,
        email,
        password: await bcrypt.hash(googleId, 10), // Store hashed Google ID
        profileImage: picture,
        role: "user",
      });

      await user.save();
    }

    // Generate JWT tokens
    const { accessToken, refreshToken } = await generateAccessRefreshTokens(user);

    // Send response with cookies
    res.status(200)
      .cookie("accessToken", accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 86400000 })
      .cookie("refreshToken", refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 604800000 })
      .json({ user: { _id: user._id, username: user.username, email: user.email, profileImage: user.profileImage }, accessToken, refreshToken, msg: "Google login successful" });

  } catch (error) {
    console.error("Error in Google Login:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};