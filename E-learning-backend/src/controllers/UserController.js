import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../modals/UserModel.js"; // Correct spelling of 'models'
import cloudinary from "../utils/cloudinary.js";

// Generate Access and Refresh Tokens
const generateAccessRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken(); 
    const refreshToken = user.refreshAccessToken();  
    
    // Save refreshToken to the user document
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new Error("Error generating tokens");
  }
};

export const register = async (req, res) => {
  try {console.table(req.body)
  
    const { username, email, password, mobileNumber, gender, role } = req.body;
    const secretKey = process.env.SECRET_KEY || "ELearning"; // Consistent secret key
    
    // Check if email or mobile number already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    const PhoneNumber = await User.findOne({ mobileNumber });
    if (PhoneNumber) {
      return res.status(400).json({ msg: "Phone already registered" });
    }

    // Hash the password manually using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Optional: Handle profile image upload if provided
    let profileImageUrl = "";
    const profileLocalPath = req.files?.profileimage?.[0]?.path;
    if (profileLocalPath) {
      const profileImage = await uploadOnCloud(profileLocalPath);
      if (!profileImage) {
        return res.status(400).json({ message: "Image upload failed" });
      }
      profileImageUrl = profileImage.secure_url;
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      mobileNumber,
      gender,
      role,
      profileImage: profileImageUrl, // Profile image URL
    });

    await newUser.save(); // Save the user to the database
    return res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Error in user registration:", error);
    return res.status(500).json({ msg: "Server error", error: error.msg });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid credentials" });
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
        msg: "User logged in successfully",
      });
  } catch (error) {
    console.error("Error in user login:", error);
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};



const deleteUser = async()=>{
  await User.deleteMany();
console.log("User Delete Successful")
}
//deleteUser();