import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({
      message: "You are not authorized to access this route , login first",
    });
  }

  const decodedToken = jwt.verify(token, process.env.JWT_KEY);
  if (!decodedToken) {
    return res.status(401).json({
      message: "invalid token, login again",
    });
  }

  const user = await User.findById(decodedToken.id).select("-password");
  if (user) {
    req.user = user;
  }

  next();
});

export { protect };
