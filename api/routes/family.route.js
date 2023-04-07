import express from "express";
import {
  createFamily,
  getFamily,
  getFamilies,
  getSections,
} from "../controllers/family.controller.js";

import { isAuth } from "../utils/Auth.js";
const router = express.Router();

router.post("/", createFamily);
router.get("/:id", isAuth, getFamily);
router.get("/", getFamilies);
router.get("/:familyId/sections", getSections);

export default router;
