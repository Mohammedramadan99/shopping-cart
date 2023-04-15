import express from "express";
import {
  createFamily,
  getFamily,
  getFamilies,
  getSections,
  addToCart,
  removeFromCart,
  addMember,
  removeMember,
  removeFamily,
} from "../controllers/family.controller.js";

import { isAuth } from "../utils/Auth.js";
const router = express.Router();

router.post("/", createFamily);
router.post("/member/:familyId", isAuth, addMember);
router.delete("/member/:idNumber/:familyId", isAuth, removeMember);

// remove from cart
router.delete("/:familyId/:productId", isAuth, removeFromCart);

// add to cart
router.get("/:familyId/:productId", isAuth, addToCart);
router.get("/", isAuth, getFamily);
router.delete("/", isAuth, removeFamily);
router.get("/:familyId/sections", getSections);

export default router;
