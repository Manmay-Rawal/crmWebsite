import userModel from "../models/userModel.js";
import { comparePassword, createHashPassword } from "../utils/bcrypt.js";
import { createToken } from "../utils/jwt.js";
import dotenv from "dotenv";

dotenv.config();


// User Signup
export const userSignup = async (req, res) => {
  try {
    const user = req.body;
    const { firstName, email, password } = user;

    if (firstName && email && password) {
      const hashedPassword = await createHashPassword(password);
      const userData = new userModel({ ...user, password: hashedPassword });
      const response = await userData.save();
      const token = createToken({ id: response._id });

      return res.status(201).send({ token });
    } else {
      return res.status(400).send({ error: "Provide all required fields" });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error", msg: error.message });
  }
};

// User Login
export const userLogin = async (req, res) => {
  try {
    const {admin, email, password } = req.body;

   

    if (email && password) {
      const user = await userModel.findOne({ email });
      if (user) {
        const isMatched = await comparePassword(password, user.password);
        if (isMatched) {
          const token = createToken({ id: user._id });
          if (admin === "ManmayKing") {
            return res.status(200).send({
              message: "Admin login successful",
              role: "admin",
              name: "ManmayKing",
              token
            });
        }
          return res.status(200).send({ message: "Login successful", token, name: user.firstName });
        } else {
          return res.status(400).send({ error: "Password not matched" });
        }
      } else {
        return res.status(400).send({ error: "User not registered" });
      }
    } else {
      return res.status(400).send({ error: "Provide all required fields" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error", msg: error.message });
  }
};

// Get User
export const getUser = async (req, res) => {
  try {
    const { id } = req.params; // Assuming `id` is passed in route parameters
    const userData = await userModel.findById(id, { password: 0, __v: 0 });

    if (!userData) {
      return res.status(404).send({ error: "User not found" });
    }

    return res.status(200).send({ userData });
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error", msg: error.message });
  }
};


