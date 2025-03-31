import mongoose from "mongoose";
import { type } from "os";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  isVerified: {
    type: Boolean,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPaasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});
const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
