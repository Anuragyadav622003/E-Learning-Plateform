// controllers/userController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../modals/User.model.js"; // Adjust the import as necessary
import { uploadOnCloud } from "../utils/cloudinary.util.js";

const secretKey = process.env.SECRET_KEY || "ELearning"; // Use consistent naming for environment variables

// Register a new user
export const registerUser = async (req, res) => {
  const {
    username,
    email,
    password,
    mobileNumber,
    gender,
    role
    
  } = req.body;
  const profileLocalPath = req.files?.profileimage?.[0]?.path;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Use a salt round of 10 for better security
 
    if(!profileLocalPath) {
      return res.status(400).json("ProfilePath not find ");
    }
    if (!profileLocalPath) {
      throw new ApiError(400, "Profile imgage file required");
    }
  
    const profileImage = await uploadOnCloud(profileLocalPath);
  
  
    if (!profileImage) {
      throw new ApiError(400, "Image upload failed");
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      mobileNumber,
      gender,
      role, // Include role in the user creation
      profileImage : profileImage.secure_url, // Include profileImage in the user creation
    });

    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Server error", error });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    // Find the user by email
    const user = await User.findOne({ email }).select("+password"); // Include the password in the query

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a token
    const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
      expiresIn: "1h", // Token expiration time
    });

    return res.status(200).json({
      message: "Login successful",
      token, // Send the token back to the client
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        mobileNumber: user.mobileNumber,
        gender: user.gender,
        role: user.role,
        profileImage: user.profileImage, // Send the profile image back as well
      },
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Server error", error });
  }
};
