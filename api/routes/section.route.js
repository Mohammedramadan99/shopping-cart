import express from "express";
import {
  createSection,
  getSection,
  getProducts,
  getSections,
  getFamilySections,
} from "../controllers/section.controller.js";
import { isAuth } from "../utils/Auth.js";

const router = express.Router();

router.post("/", createSection);
router.get("/:familyId", isAuth, getFamilySections);
router.get("/section/:sectionId", isAuth, getSection);
router.get("/", getSections);
router.get("/:sectionId/products", getProducts);

export default router;
