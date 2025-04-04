import mongoose, { mongo } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure emails are unique
    lowercase: true, // Store email in lowercase
  },
  password: {
    type: String,
    required: true,
    // select: false, // Don't return the password by default
  },
  mobileNumber: {
    type: String,
    unique: true, // Ensure mobile numbers are unique
    match: [/^\d{10}$/, 'Please enter a valid mobile number'], // Regex for validation
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'], // Options for gender
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'], // Role options
    default: 'student', // Default role
  },
  profileImage: {
    type: String,
    default: 'default-profile.png', // Default profile image URL
  },
  bio: {
    type: String,
    maxlength: 500, // Maximum length for bio
  },
  coursesEnrolled: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Reference to the Course model
  }],
  coursesCreated: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Reference to the Course model
  }],
  achivements:[{type:mongoose.Schema.Types.ObjectId,ref:'Achivement'}]
}, { timestamps: true }); // Automatically handles createdAt and updatedAt



// Method to compare entered password with stored hashed password
userSchema.methods.isPasswordValid = async function (password) {
  return bcrypt.compare(password, this.password); // Compare passwords
};

// Generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    fullName: this.username, // Replace with actual fullName if available
  }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
}

// Generate refresh token
userSchema.methods.refreshAccessToken = function () {
  return jwt.sign({
    _id: this._id,
  }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION });
}


const User = mongoose.model('User', userSchema);

export default User;
