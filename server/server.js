

import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./db/dbConfig.js";
import { userLogin, userSignup} from "./controllers/userController.js";
import { verifyOtp } from "./controllers/otpController.js";
import userRouter from "./routes/userRouter.js";
import path from 'path';

const app = express();

const _dirname=path.resolve();


dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials
  }));

  app.use(express.static(path.join(_dirname,"/client/dist")));
  app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"client","dist","index.html"));
  })
  

// demoAPI
app.get('/', (req, res) => res.send('server is working'));

// userRoutes
app.use("/user", userRouter);

// Signup API (already handled by userRouter)
userRouter.post("/signup", userSignup);

// Login API (already handled by userRouter)
userRouter.post("/login", userLogin);



const PORT = process.env.PORT || 4000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
    dbConnect();
});
