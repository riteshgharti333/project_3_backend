import express from "express";

import {
  deleteTeam,
  getAllTeams,
  getSingleTeam,
  newTeam,
  updateTeam,
} from "../controllers/TeamController.js";

const router = express.Router();

router.post("/new-team", newTeam);
router.get("/all-teams", getAllTeams);
router.get("/:id", getSingleTeam);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

export default router;
