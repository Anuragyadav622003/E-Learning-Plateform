import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    mobileNumber: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    role: { type: String, enum: ["student", "instructor", "admin"], default: "student" },
    profileImage: { type: String, default: "default-profile.png" },
    bio: { type: String, maxlength: 500 },
    coursesEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    coursesCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

userSchema.methods.isPasswordValid = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, username: this.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );
};

userSchema.methods.refreshAccessToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION,
  });
};

const User = mongoose.model("User", userSchema);

export default User;
