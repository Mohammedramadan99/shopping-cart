import express from "express";

const router = express.Router();

import { addToCart, removeFromCart } from "../controllers/cart.controller.js";

// Add item to cart
router.post("/:productId/add", addToCart);

// Remove item from cart
router.post("/:productId/remove", removeFromCart);

export default router;
