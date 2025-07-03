import express from "express";
import { deleteSingleContact, getAllContacts, getSingleContact, newContact } from "../controllers/ContactController.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/submit-contact", newContact);

router.get("/all-contacts", getAllContacts);

router.get("/:id", getSingleContact);

router.delete("/:id", isAuthenticated, isAdmin, deleteSingleContact);


export default router;
