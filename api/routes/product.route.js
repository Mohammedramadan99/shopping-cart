import express from "express";
import { createProduct,getProducts } from "../controllers/product.controller.js";
import { loginValidate } from "../utils/validateUser.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);

export default router;
