import express from "express";
import {
  createFamily,
  getFamily,
  getFamilies,
  getSections,
  addToCart,
  removeFromCart,
} from "../controllers/family.controller.js";

import { isAuth } from "../utils/Auth.js";
const router = express.Router();

router.post("/", createFamily);
router.post("/:familyId/:productId", isAuth, addToCart);
router.delete("/:familyId/:productId", isAuth, removeFromCart);
router.get("/:id", isAuth, getFamily);
router.get("/", getFamilies);
router.get("/:familyId/sections", getSections);

export default router;
