import express from "express";
import {
  createVideo,
  getAllVideos,
  getVideoById,
  deleteVideo,
} from "../controllers/Video2Controller.js";

const router = express.Router();

router.post("/new-video", createVideo);

router.get("/all-videos", getAllVideos);

router.get("/:id", getVideoById);

router.delete("/:id", deleteVideo);

export default router;
