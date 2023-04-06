import express from "express";
import {
  createSection,
  getSection,
} from "../controllers/section.controller.js";
import { isAuth } from "../utils/Auth.js";

const router = express.Router();

router.post("/", createSection);
router.get("/:id", isAuth, getSection);

export default router;
