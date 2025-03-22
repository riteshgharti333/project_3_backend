import express from "express";
import {
  getAllServicesImg,
  getServicesImg,
  newServicesImg,
  updateServicesImg,
} from "../controllers/ServicesController.js";

import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/", getAllServicesImg);

// 1
router.post("/new/wedding-photography", upload.array("images"), newServicesImg);

router.get("/wedding-photography/:id", getServicesImg);

router.put(
  "/wedding-photography/:id",
  upload.array("images"),
  updateServicesImg
);

// 2
router.post(
  "/new/wedding-cinematography",
  upload.array("images"),
  newServicesImg
);

router.get("/wedding-cinematography/:id", getServicesImg);

router.put(
  "/wedding-cinematography/:id",
  upload.array("images"),
  updateServicesImg
);

//3
router.post("/new/pre-wedding-films", upload.array("images"), newServicesImg);

router.get("/pre-wedding-films/:id", getServicesImg);

router.put("/pre-wedding-films/:id", upload.array("images"), updateServicesImg);

//4
router.post(
  "/new/pre-wedding-photography",
  upload.array("images"),
  newServicesImg
);

router.get("/pre-wedding-photography/:id", getServicesImg);

router.put(
  "/pre-wedding-photography/:id",
  upload.array("images"),
  updateServicesImg
);

//5

router.post(
  "/new/civil-marriage-photography",
  upload.array("images"),
  newServicesImg
);

router.get("/civil-marriage-photography/:id", getServicesImg);

router.put(
  "/civil-marriage-photography/:id",
  upload.array("images"),
  updateServicesImg
);

//6

router.post(
  "/new/engagement-photography-couple-portraits",
  upload.array("images"),
  newServicesImg
);

router.get("/engagement-photography-couple-portraits/:id", getServicesImg);

router.put(
  "/engagement-photography-couple-portraits/:id",
  upload.array("images"),
  updateServicesImg
);

//7
router.post(
  "/new/birthday-photography",
  upload.array("images"),
  newServicesImg
);

router.get("/birthday-photography/:id", getServicesImg);

router.put(
  "/birthday-photography/:id",
  upload.array("images"),
  updateServicesImg
);

// 8

router.post(
  "/new/baby-shower-photography",
  upload.array("images"),
  newServicesImg
);

router.get("/baby-shower-photography/:id", getServicesImg);

router.put(
  "/baby-shower-photography/:id",
  upload.array("images"),
  updateServicesImg
);

// 9

router.post(
  "/new/graduation-photography",
  upload.array("images"),
  newServicesImg
);

router.get("/graduation-photography/:id", getServicesImg);

router.put(
  "/graduation-photography/:id",
  upload.array("images"),
  updateServicesImg
);

export default router;
