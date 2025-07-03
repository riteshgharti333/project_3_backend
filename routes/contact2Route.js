import express from "express";
import {
  deleteContact,
  getAllContacts,
  getSingleContact,
  newContact,
} from "../controllers/Contact2Controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/new-contact2", newContact);

router.get("/all-contact2", getAllContacts);

router.get("/contact-2/:id", getSingleContact);

router.delete("/contact-2/:id", isAuthenticated, isAdmin, deleteContact);

export default router;
