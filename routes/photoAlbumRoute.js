import express from "express";
import {
  deletePhotoAlbum,
  getAllPhotoAlbums,
  getSinglePhotoAlbum,
  newPhotoAlbum,
  updatePhotoAlbum,
} from "../controllers/PhotoAlbumController.js";

const router = express.Router();

router.post("/new-photo-album", newPhotoAlbum);

router.get("/all-photo-album", getAllPhotoAlbums);

router.get("/:id", getSinglePhotoAlbum);

router.put("/:id", updatePhotoAlbum);

router.delete("/:id", deletePhotoAlbum);

export default router;
