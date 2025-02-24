import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import HomeBanner from "../models/homeBannerModel.js";
import ErrorHandler from "../utils/errorHandler.js";

// CREATE NEW BANNER

export const newHomeBanner = catchAsyncError(async (req, res, next) => {
  const { bannerTitle, bannerDetails } = req.body;

  // Check for empty fields
  if (!bannerTitle || !bannerDetails || !bannerDetails.length) {
    return next(new ErrorHandler("All fields are required!", 400));
  }

  // Validate that each detail object contains title, desc, and image
  for (let item of bannerDetails) {
    if (!item.title || !item.desc || !item.image) {
      return next(
        new ErrorHandler(
          "Each detail item must have title, desc, and image",
          400
        )
      );
    }
  }

  // Create new banner entry
  const newBanner = new HomeBanner({
    bannerTitle,
    bannerDetails,
  });

  await newBanner.save();

  res.status(201).json({
    success: true,
    message: "Home Banner created successfully!",
    homeBanner: newBanner,
  });
});

// GET SINGLE BANNER

export const getSingleHomeBanner = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;

  const homeBanner = await HomeBanner.findById(id);

  if (!homeBanner) {
    return next(new ErrorHandler("Banner not found!", 404));
  }

  res.status(200).json({
    success: true,
    homeBanner: homeBanner,
  });
});

// GET ALL BANNER

export const getAllHomeBanner = catchAsyncError(async (req, res, next) => {
  const homeBanners = await HomeBanner.find();

  if (!homeBanners || homeBanners.length === 0) {
    return next(new ErrorHandler("No banners found!", 404));
  }

  res.status(200).json({
    success: true,
    homeBanners: homeBanners,
  });
});

// DELETE SINGLE BANNER

export const deleteHomeBanner = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  // Check if the banner exists
  const banner = await HomeBanner.findById(id);

  if (!banner) {
    return next(new ErrorHandler("Banner not found!", 404));
  }

  // Delete the banner
  await HomeBanner.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Banner deleted successfully!",
  });
});


// UPDATE SINGLE BANNER
export const updateHomeBanner = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { bannerTitle, bannerDetails } = req.body; 

  // Check if the banner exists
  const banner = await HomeBanner.findById(id);

  if (!banner) {
    return next(new ErrorHandler("Banner not found!", 404));
  }

  // Update the banner title if provided
  if (bannerTitle) {
    banner.bannerTitle = bannerTitle;
  }

  // Completely replace bannerDetails if provided
  if (bannerDetails && Array.isArray(bannerDetails)) {
    banner.bannerDetails = bannerDetails; // This replaces the array
  }

  // Save the updated banner
  await banner.save();

  res.status(200).json({
    success: true,
    message: "Banner updated successfully!",
    updatedBanner: banner,
  });
});
