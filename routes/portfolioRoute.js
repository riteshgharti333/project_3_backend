import express from "express";
import {
  deletePortfolio,
  getAllPortfolios,
  getSinglePortfolio,
  newPortfolio,
  updatePortfolio,
} from "../controllers/PortfolioController.js";

const router = express.Router();

router.post("/new-portfolio", newPortfolio);
router.get("/all-portfolios", getAllPortfolios);
router.get("/:id", getSinglePortfolio);
router.put("/:id", updatePortfolio);
router.delete("/:id", deletePortfolio);

export default router;
