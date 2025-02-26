import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, minLength: 3 },
    lastName: { type: String, trim: true, minLength: 3 },
    email: { type: String, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  unique: true },
    phoneNo: { type: String, trim: true,unique: true },
    isVerified: { type: Boolean, default: false },
    password: { type: String },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

export default userModel;
