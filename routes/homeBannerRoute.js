import express from "express";
import {
  deleteHomeBanner,
  getAllHomeBanner,
  getSingleHomeBanner,
  newHomeBanner,
} from "../controllers/HomeBannerController.js";

import upload from "../middlewares/multer.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post(
  "/new-home-banner",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  newHomeBanner
);

router.get("/all-home-banners", getAllHomeBanner);

router.get("/:id", getSingleHomeBanner);

router.delete("/:id", isAuthenticated, isAdmin, deleteHomeBanner);

export default router;
