import express from "express";
import {
  getAllServicesImg,
  getServicesImg,
  newServicesImg,
  updateServicesImg,
} from "../controllers/ServicesController.js";

import upload from "../middlewares/multer.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/", getAllServicesImg);

// 1
router.post(
  "/new/wedding-photography",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  newServicesImg
);

router.get("/wedding-photography/:id", getServicesImg);

router.put(
  "/wedding-photography/:id",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  updateServicesImg
);

// 2
router.post(
  "/new/wedding-cinematography",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  newServicesImg
);

router.get("/wedding-cinematography/:id", getServicesImg);

router.put(
  "/wedding-cinematography/:id",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  updateServicesImg
);

//3
router.post(
  "/new/pre-wedding-film",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  newServicesImg
);

router.get("/pre-wedding-film/:id", getServicesImg);

router.put(
  "/pre-wedding-film/:id",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  updateServicesImg
);

//4
router.post(
  "/new/pre-wedding-photography",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  newServicesImg
);

router.get("/pre-wedding-photography/:id", getServicesImg);

router.put(
  "/pre-wedding-photography/:id",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  updateServicesImg
);

//5

router.post(
  "/new/civil-marriage-photography",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  newServicesImg
);

router.get("/civil-marriage-photography/:id", getServicesImg);

router.put(
  "/civil-marriage-photography/:id",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  updateServicesImg
);

//6

router.post(
  "/new/engagement-photography-couple-portraits",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  newServicesImg
);

router.get("/engagement-photography-couple-portraits/:id", getServicesImg);

router.put(
  "/engagement-photography-couple-portraits/:id",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  updateServicesImg
);

//7
router.post(
  "/new/birthday-photography",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  newServicesImg
);

router.get("/birthday-photography/:id", getServicesImg);

router.put(
  "/birthday-photography/:id",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  updateServicesImg
);

// 8

router.post(
  "/new/baby-shower-photography",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  newServicesImg
);

router.get("/baby-shower-photography/:id", getServicesImg);

router.put(
  "/baby-shower-photography/:id",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  updateServicesImg
);

// 9

router.post(
  "/new/graduation-photography",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  newServicesImg
);

router.get("/graduation-photography/:id", getServicesImg);

router.put(
  "/graduation-photography/:id",
  isAuthenticated,
  isAdmin,
  upload.array("images"),
  updateServicesImg
);

export default router;
