

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
// app.use(cors({ origin: "http://localhost:5173" }));
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials
  }));

  app.use(express.static(path.join(_dirname,"/CRM/dist")));
  app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"CRM","dist","index.html"));
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
const hostname = process.env.HOST_ADD || "localhost";  // Corrected hostname initialization

app.listen(PORT, hostname, () => {
    console.log(`server is start http://${hostname}:${PORT}`);
    dbConnect();
});
