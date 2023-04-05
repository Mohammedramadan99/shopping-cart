import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const isAuth = async (req, res, next) => {
  // Retrieve the authentication token from the request headers
  let token = req.headers.authorization.split(" ")[1];
  // Check if token is present
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }
  console.log({ token });
  try {
    // Verify and decode the token to get the user object
    const decoded = jwt.verify(token, process.env.JWT_KEY); // Replace with your actual secret key
    console.log(decoded.id);
    req.user = decoded.id;
    next(); // Call next middleware
  } catch (error) {
    res.status(401).json({ error: "Token is not valid" });
  }
};
