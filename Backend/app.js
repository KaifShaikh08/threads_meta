import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/userRoutes.js";
import postRouter from "./Routes/postRoutes.js";
import { v2 as Cloudinary } from "cloudinary";

export const app = express();

config({
  path: "./config.env",
});

Cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.get("/", (req, res) => {
  res.send("WORKING");
});
