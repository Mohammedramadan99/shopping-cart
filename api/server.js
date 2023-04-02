import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

// connect to mongodb
mongoose.set("strictQuery", true);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};
app.use(express.json());

// cookie-parser is used to set up and configure the Express application to handle cookies
// i think we will need to use it soon
app.use(cookieParser());

// run the server
app.listen(8800, () => {
  connect();
  console.log("Backend server is running!");
});
