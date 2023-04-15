import express from "express";

const router = express.Router();

import { addToCart, removeFromCart } from "../controllers/cart.controller.js";
import { isAuth } from "../utils/Auth.js";

// Add item to cart
router.post("/:productId/add", isAuth, addToCart);

// Remove item from cart
router.post("/:productId/remove", isAuth, removeFromCart);

export default router;
