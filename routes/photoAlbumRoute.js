import express from "express";
import {
  deletePhotoAlbum,
  getAllPhotoAlbums,
  getSinglePhotoAlbum,
  newPhotoAlbum,
} from "../controllers/PhotoAlbumController.js";

import upload from "../middlewares/multer.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post(
  "/new-photo-album",
  isAuthenticated,
  isAdmin,
  upload.single("image"),
  newPhotoAlbum
);

router.get("/all-photo-album", getAllPhotoAlbums);

router.get("/:id", getSinglePhotoAlbum);

router.delete("/:id", isAuthenticated, isAdmin, deletePhotoAlbum);

export default router;
