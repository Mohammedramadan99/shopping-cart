import express from "express";
import {
  createProduct,
  getProducts,
  deleteProduct,
} from "../controllers/product.controller.js";
import { isAuth } from "../utils/Auth.js";

const router = express.Router();

router.post("/", isAuth, createProduct);
router.get("/", getProducts);
router.delete("/:id", deleteProduct);

export default router;
