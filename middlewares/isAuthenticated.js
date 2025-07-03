import jwt from "jsonwebtoken";
import { Auth } from "../models/authModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login required", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Auth.findById(decoded._id);

    if (!user) return next(new ErrorHandler("User not found", 404));

    req.user = user; 
    next();
  } catch (err) {
    return next(new ErrorHandler("Invalid token", 401));
  }
};
