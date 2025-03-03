import express from "express";
import {
    getAllServicesImg,
  getServicesImg,
  newServicesImg,
  updateServicesImg,
} from "../controllers/ServicesController.js";

const router = express.Router();

router.get("/", getAllServicesImg);


// 1
router.post("/new/wedding-photography", newServicesImg);

router.get("/wedding-photography/:id", getServicesImg);

router.put("/wedding-photography/:id", updateServicesImg);

// 2
router.post("/new/wedding-cinematography", newServicesImg);

router.get("/wedding-cinematography/:id", getServicesImg);

router.put("/wedding-cinematography/:id", updateServicesImg);

//3
router.post("/new/pre-wedding-films", newServicesImg);

router.get("/pre-wedding-films/:id", getServicesImg);

router.put("/pre-wedding-films/:id", updateServicesImg);

//4
router.post("/new/pre-wedding-photography", newServicesImg);

router.get("/pre-wedding-photography/:id", getServicesImg);

router.put("/pre-wedding-photography/:id", updateServicesImg);

//5

router.post("/new/civil-marriage-photography", newServicesImg);

router.get("/civil-marriage-photography/:id", getServicesImg);

router.put("/civil-marriage-photography/:id", updateServicesImg);

//6

router.post("/new/engagement-photography-couple-portraits", newServicesImg);

router.get("/engagement-photography-couple-portraits/:id", getServicesImg);

router.put("/engagement-photography-couple-portraits/:id", updateServicesImg);

//7
router.post("/new/birthday-photography", newServicesImg);

router.get("/birthday-photography/:id", getServicesImg);

router.put("/birthday-photography/:id", updateServicesImg);

// 8

router.post("/new/baby-shower-photography", newServicesImg);

router.get("/baby-shower-photography/:id", getServicesImg);

router.put("/baby-shower-photography/:id", updateServicesImg);

// 9

router.post("/new/graduation-photography", newServicesImg);

router.get("/graduation-photography/:id", getServicesImg);

router.put("/graduation-photography/:id", updateServicesImg);

export default router;
