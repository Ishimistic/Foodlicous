import express from "express";
import {addProducts, getFoodById, getFoodItems, deleteProduct} from "../controllers/FoodController.js";
 

const router = express.Router();

router.post("/add", addProducts);
router.patch("/delete/:id", deleteProduct);
router.get("/", getFoodItems);
router.get("/:id", getFoodById);

export default router;