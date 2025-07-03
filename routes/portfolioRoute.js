import express from "express";
import {
  deletePortfolio,
  getAllPortfolios,
  getSinglePortfolio,
  newPortfolio,
} from "../controllers/PortfolioController.js";

import upload from "../middlewares/multer.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post(
  "/new-portfolio",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  newPortfolio
);

router.get("/all-portfolios", getAllPortfolios);

router.get("/:id", getSinglePortfolio);

router.delete("/:id", isAuthenticated, isAdmin, deletePortfolio);

export default router;
