import express from "express";

import {
  deleteTeam,
  getAllTeams,
  getSingleTeam,
  newTeam,
  updateTeam,
} from "../controllers/TeamController.js";

import upload from "../middlewares/multer.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post(
  "/new-team",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  newTeam
);
router.get("/all-teams", getAllTeams);

router.get("/:id", getSingleTeam);

router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  updateTeam
);

router.delete("/:id", isAuthenticated, isAdmin, deleteTeam);

export default router;
