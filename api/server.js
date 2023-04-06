import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import familyRoute from "./routes/family.route.js";
import sectionRoute from "./routes/section.route.js";
import productRoute from "./routes/product.route.js";
import cors from "cors";

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
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// The express.json() middleware function is used to parse incoming request bodies in JSON format. This function parses the JSON data in the request body and makes it available in req.body property of the Request object.
app.use(express.json());

// cookie-parser is used to set up and configure the Express application to handle cookies
// i think we will need to use it soon
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/family", familyRoute);
app.use("/api/section", sectionRoute);
app.use("/api/products", productRoute);

// Handling the errors
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

// run the server
const Port = process.env.PORT || 3001;
app.listen(Port, () => {
  connect();
  console.log(`server is running on port ${Port}`);
});
