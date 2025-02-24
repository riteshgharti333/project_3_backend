import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Portfolio } from "../models/portfolioModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const newPortfolio = catchAsyncError(async (req, res, next) => {
  const { name, title, image } = req.body;

  if (!name || !title || !image) {
    return next(new ErrorHandler("All fields are required!", 400));
  }

  const newPortfolio = await Portfolio.create({
    name,
    title,
    image,
  });

  res.status(201).json({
    success: true,
    message: "Portfolio added successfully!",
    portfolio: newPortfolio,
  });
});

// GET SINGLE PORTFOLIO

export const getSinglePortfolio = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const portfolio = await Portfolio.findById(id);

  if (!portfolio) {
    return next(new ErrorHandler("Portfolio not found!", 404));
  }

  res.status(200).json({
    success: true,
    portfolio,
  });
});

// GET All PORTFOLIO

export const getAllPortfolios = catchAsyncError(async (req, res, next) => {
  const portfolios = await Portfolio.find();

  res.status(200).json({
    success: true,
    portfolios,
  });
});

// UPDATE PORTFOLIO

export const updatePortfolio = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { name, title, image } = req.body;

  const portfolio = await Portfolio.findById(id);

  if (!portfolio) {
    return next(new ErrorHandler("Portfolio not found!", 404));
  }

  portfolio.name = name || portfolio.name;
  portfolio.title = title || portfolio.title;
  portfolio.image = image || portfolio.image;

  await portfolio.save();

  res.status(200).json({
    success: true,
    message: "Portfolio updated successfully!",
    portfolio,
  });
});

// DELETE PORTFOLIO

export const deletePortfolio = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const portfolio = await Portfolio.findById(id);

  if (!portfolio) {
    return next(new ErrorHandler("Portfolio not found!", 404));
  }

  await portfolio.deleteOne();

  res.status(200).json({
    success: true,
    message: "Portfolio deleted successfully!",
  });
});
