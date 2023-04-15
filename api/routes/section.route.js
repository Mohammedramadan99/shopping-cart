import express from "express";
import {
  createSection,
  getSection,
  getProducts,
  getFamilySections,
  removeSection,
} from "../controllers/section.controller.js";
import { isAuth } from "../utils/Auth.js";

const router = express.Router();

router.post("/", createSection);
router.get("/:familyId", isAuth, getFamilySections);
router.delete("/:sectionId", isAuth, removeSection);
router.get("/section/:sectionId", isAuth, getSection);

router.get("/:sectionId/products", getProducts);

export default router;
