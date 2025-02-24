import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Auth } from "../models/authModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendCookie } from "../utils/features.js";
import bcrypt from "bcrypt";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check for empty fields
  if (!name || !email || !password) {
    return next(new ErrorHandler("All fields are required!", 400));
  }

  // Check if the user already exists
  let existingUser = await Auth.findOne({ email });

  if (existingUser) return next(new ErrorHandler("User Already Exists", 400));

  // Create a new user (password is hashed automatically in `pre("save")`)
  const user = await Auth.create({ name, email, password });

  sendCookie(user, res, "Registered Successfully", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Auth.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("User Not Found Of This Email", 400));
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }

  user.password = undefined;

  sendCookie(user, res, "Login Succesfully", 200);
});
