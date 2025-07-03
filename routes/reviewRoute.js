import express from "express";

import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
} from "../controllers/ReviewController.js";

import upload from "../middlewares/multer.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post(
  "/new-review",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  createReview
);
router.get("/all-reviews", getAllReviews);

router.get("/:id", getReviewById);

router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  updateReview
);

router.delete("/:id", isAuthenticated, isAdmin, deleteReview);

export default router;
