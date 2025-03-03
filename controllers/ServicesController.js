import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Service } from "../models/servicesModel.js";
import ErrorHandler from "../utils/errorHandler.js";

// NEW SERVICE


export const newServicesImg = catchAsyncError(async (req, res, next) => {
  const { serviceName, images } = req.body;

  if (!serviceName) {
    return next(new ErrorHandler("Service name is required!", 400));
  }

  if (!images || !Array.isArray(images) || images.length === 0) {
    return next(new ErrorHandler("At least one image is required!", 400));
  }

  const service = await Service.create({ serviceName, images });

  res.status(201).json({
    success: true,
    message: "Service created successfully!",
    service,
  });
});


// GET SERVICE BY ID
export const getServicesImg = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const serviceImages = await Service.findById(id); 

  if (!serviceImages) {
    return next(new ErrorHandler("No service image found!", 404));
  }

  res.status(200).json({
    success: true,
    serviceImages,
  });
});


// UPDATE SERVICE
export const updateServicesImg = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { serviceName, images } = req.body;

  if (!serviceName) {
    return next(new ErrorHandler("Service name is required!", 400));
  }

  if (!images || !Array.isArray(images) || images.length === 0) {
    return next(new ErrorHandler("At least one image is required!", 400));
  }

  const updatedService = await Service.findByIdAndUpdate(
    id,
    { $set: { serviceName, images } },
    { new: true }
  );

  if (!updatedService) {
    return next(new ErrorHandler("Service not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Service updated successfully",
    data: updatedService,
  });
});




// GET ALL SERVICES
export const getAllServicesImg = catchAsyncError(async (req, res, next) => {
  const services = await Service.find(); // Fetch all service documents

  if (!services || services.length === 0) {
    return next(new ErrorHandler("No services found!", 404));
  }

  res.status(200).json({
    success: true,
    count: services.length,
    services,
  });
});


export const getAllServices = catchAsyncError(async (req, res, next) => {
  const services = await Service.find();

  if (!services || services.length === 0) {
    return next(new ErrorHandler("No services found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Services retrieved successfully",
    data: services,
  });
});