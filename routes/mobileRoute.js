import express from "express";
import {
  deleteMobileBanner,
  getAllMobileBanner,
  getSingleMobileBanner,
  newMobileBanner,
} from "../controllers/mobileController.js";

import upload from "../middlewares/multer.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/new-mobile-banner",isAuthenticated, isAdmin , upload.single("image"), newMobileBanner);

router.get("/all-mobile-banners", getAllMobileBanner);

router.get("/:id", getSingleMobileBanner);

router.delete("/:id",isAuthenticated, isAdmin , deleteMobileBanner);

export default router;
