// controllers/userController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../modals/UserModel.js"; // Adjust the import as necessary
import { uploadOnCloud } from "../utils/cloudinary.util.js";

const secretKey = process.env.SECRET_KEY || "ELearning"; // Use consistent naming for environment variables

// Function to generate access and refresh tokens
const generateAccessRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId); 
    const accessToken = user.generateAccessToken(); 
    const refreshToken = user.refreshAccessToken(); 
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating refresh and access tokens");
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
    role
    
  } = req.body;
  const profileLocalPath = req.files?.profileimage?.[0]?.path;

  try {
    // Check if the user already exists by email
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Check if the mobile number already exists
    const existingUserByMobile = await User.findOne({ mobileNumber });
    if (existingUserByMobile) {
      return res.status(400).json({ message: "Mobile number already registered" });
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
  }
 } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Server error", error });
  }
};


// Login a user
export const loginUser = async (req, res) => {
  const { username , email, password } = req.body;

  if( !username &&  !email){
    return  res.status(404).json("Invalid username or email you enter");
  }
 

  try {
  
    const user = await User.findOne({ $or:[{username},{ email }]}); 
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

 
    const isPasswordValid =  await bcrypt.compare(password , user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const { accessToken, refreshToken } = await generateAccessRefreshTokens( user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
  
    const options = {
      httpOnly: true,
      secure: true
    };
  
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken
          },
          "User logged in successfully"
        )
      );
  
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Server error", error });
  }
};

// Logout  function  here
const logoutUser   =   async  ( req , res ) =>{
  await User.findByIdAndUpdate(req.user._id , {
    $unset : {
      refreshToken : 1 ,

    }
  },
{
  new: true
}) ;

const options = {
  httpOnly : true  ,
  secure: true 

}

return res
.status(200)
.clearCookie("accessToken",  options)
.clearCookie("refreshToken",  options)
.json(

  200,
  {
    
  },
  "User logged Out  successfully"

);
};
