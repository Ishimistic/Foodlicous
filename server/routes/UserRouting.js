import express from "express";
import {
  addToCart,
  addToFavorites,
  getAllCartItems,
  getUserFavorites,
  getUserOrders,
  placeOrder,
  removeFromCart,
  removeFromFavorites,
  UserLogin,
  UserRegister,

} from "../controllers/UserControllers.js";
import { verifyToken } from "../middleware/verifyUser.js";

// console.log("UserRegisteration", UserRegister);
const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);

router.post("/cart", verifyToken, addToCart);
router.get("/cart", verifyToken, getAllCartItems);
router.patch("/cart", verifyToken, removeFromCart);

router.post("/favorites", verifyToken, addToFavorites);
router.get("/favorites", verifyToken, getUserFavorites);
router.patch("/favorites", verifyToken, removeFromFavorites);

router.post("/order", verifyToken, placeOrder);
router.get("/order", verifyToken, getUserOrders);

export default router;
