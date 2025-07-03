import express from "express";
import {
  createVideo,
  getAllVideos,
  getVideoById,
  deleteVideo,
  updateVideoOrder,
} from "../controllers/Video1Controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/new-video", isAuthenticated, isAdmin, createVideo);

router.get("/all-videos", getAllVideos);

router.get("/:id", getVideoById);

router.delete("/:id", isAuthenticated, isAdmin, deleteVideo);

router.put("/reorder", isAuthenticated, isAdmin, updateVideoOrder);

export default router;
