import express from "express";
import {
  deleteHomeBanner,
  getAllHomeBanner,
  getSingleHomeBanner,
  newHomeBanner,
  updateHomeBanner,
} from "../controllers/HomeBannerController.js";

const router = express.Router();

router.post("/new-home-banner", newHomeBanner);

router.get("/all-home-banners", getAllHomeBanner);

router.get("/:id", getSingleHomeBanner);

router.put("/:id", updateHomeBanner);

router.delete("/:id", deleteHomeBanner);

export default router;
