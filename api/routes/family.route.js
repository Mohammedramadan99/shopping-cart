import express from "express";
import {
  createFamily,
  getFamily,
  getFamilies,
} from "../controllers/family.controller.js";

import { isAuth } from "../utils/Auth.js";
const router = express.Router();

router.post("/", createFamily);
router.get("/:id", isAuth, getFamily);
router.get("/", getFamilies);

export default router;
