import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Service } from "../models/servicesModel.js";
import ErrorHandler from "../utils/errorHandler.js";

import streamifier from "streamifier";
import mongoose from "mongoose";
import cloudinary from "../utils/cloudinary.js";

// NEW SERVICE

export const newServicesImg = catchAsyncError(async (req, res, next) => {
  const { serviceName } = req.body;

  if (!serviceName) {
    return next(new ErrorHandler("Service name is required!", 400));
  }

  if (!req.files || req.files.length === 0) {
    return next(new ErrorHandler("At least one image is required!", 400));
  }

  let imageUrls = [];

  try {
    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "tk_production_film/service_images",
            transformation: [{ quality: "auto", fetch_format: "auto" }],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(file.buffer).pipe(stream);
      });

      imageUrls.push(result.secure_url);
    }
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return next(new ErrorHandler("Failed to upload images to Cloudinary", 500));
  }

  const service = await Service.create({
    serviceName,
    images: imageUrls,
  });

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
  const { serviceName } = req.body;

  const service = await Service.findById(id);
  if (!service) {
    return next(new ErrorHandler("Service not found", 404));
  }

  let imageUrls = [];

  // ✅ Handle new image uploads
  if (req.files && req.files.length > 0) {
    try {
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "tk_production_film/service_images",
              transformation: [{ quality: "auto", fetch_format: "auto" }],
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );

          streamifier.createReadStream(file.buffer).pipe(stream);
        });

        imageUrls.push(result.secure_url);
      }
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return next(
        new ErrorHandler("Failed to upload images to Cloudinary", 500)
      );
    }
  }

  // ✅ Add existing image URLs from FormData (to keep them)
  if (req.body.images) {
    const existingImages = Array.isArray(req.body.images)
      ? req.body.images
      : [req.body.images];  
      
    imageUrls.push(...existingImages);  // ✅ Add existing images
  }

  // ✅ Update the service
  service.serviceName = serviceName || service.serviceName;
  service.images = imageUrls;

  await service.save();

  res.status(200).json({
    success: true,
    message: "Service updated successfully",
    data: service,
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
