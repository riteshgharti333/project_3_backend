import { PhotoAlbum } from "../models/photoAlbumModel.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

// NEW PHOTOALBUM

export const newPhotoAlbum = catchAsyncError(async (req, res, next) => {
  const { images } = req.body;

  if (!images || !Array.isArray(images) || images.length === 0) {
    return next(new ErrorHandler("At least one image is required!", 400));
  }

  const newAlbum = await PhotoAlbum.create({ images });

  res.status(201).json({
    success: true,
    message: "Photo album created successfully!",
    album: newAlbum,
  });
});

// ALL  PHOTOALBUM

export const getAllPhotoAlbums = catchAsyncError(async (req, res) => {
  const albums = await PhotoAlbum.find();
  res.status(200).json({
    success: true,
    albums,
  });
});

// GET SINGLE PHOTO ALBUM
export const getSinglePhotoAlbum = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const album = await PhotoAlbum.findById(id);

  if (!album) {
    return next(new ErrorHandler("Photo album not found!", 404));
  }

  res.status(200).json({
    success: true,
    album,
  });
});

// UPDATE PHOTOALBUM
export const updatePhotoAlbum = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { images } = req.body;

  if (!images || !Array.isArray(images) || images.length === 0) {
    return next(new ErrorHandler("At least one image is required!", 400));
  }

  const updatedAlbum = await PhotoAlbum.findByIdAndUpdate(
    id,
    { images },
    { new: true, runValidators: true }
  );

  if (!updatedAlbum) {
    return next(new ErrorHandler("Photo album not found!", 404));
  }

  res.status(200).json({
    success: true,
    message: "Photo album updated successfully!",
    album: updatedAlbum,
  });
});

// DELETE PHOTOALBUM
export const deletePhotoAlbum = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const album = await PhotoAlbum.findByIdAndDelete(id);

  if (!album) {
    return next(new ErrorHandler("Photo album not found!", 404));
  }

  res.status(200).json({
    success: true,
    message: "Photo album deleted successfully!",
  });
});
