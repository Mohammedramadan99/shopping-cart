import express from "express";
import {
  createSection,
  getSection,
  getProducts,
  getSections,
} from "../controllers/section.controller.js";
import { isAuth } from "../utils/Auth.js";

const router = express.Router();

router.post("/", createSection);
router.get("/:id", isAuth, getSection);
router.get("/", getSections);
router.get("/:sectionId/products", getProducts);

export default router;
