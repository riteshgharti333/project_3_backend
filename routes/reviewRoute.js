import express from "express";

import { createReview, deleteReview, getAllReviews, getReviewById, updateReview } from "../controllers/reviewController.js";

import upload from "../middlewares/multer.js";



const router = express.Router();

router.post("/new-review", upload.single("image"), createReview);
router.get("/all-reviews", getAllReviews);

router.get("/:id", getReviewById);

router.put("/:id", upload.single("image"), updateReview);

router.delete("/:id", deleteReview);

export default router;
