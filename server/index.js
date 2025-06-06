import express from "express";
import cors from "cors"
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import multer from "multer";
import { createCoin } from "./controllers/coin.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import coinRoutes from "./routes/coin.js";
import cookieParser from "cookie-parser";
import { verifyToken } from "./middleware/auth.js";

const app = express();
dotenv.config();

//middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true 
}));
app.use(cookieParser());

/*
Storage for files - coin image to process it for OpenAPI Req
destination -> where it is stored
filename -> what it will be named
cb is callback (null if no error)
*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

//file route
app.post('/coin/', verifyToken, upload.single('file'), createCoin);

//routes
app.use("/api/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/coin", coinRoutes);

app.get("/", (req, res) => {
  res.send("Hello")
})

app.listen(5000, () => {
  connectDB();
  console.log("Server listening at http://localhost:5000 ");
})