import express from "express";
import {
  createSection,
  getSection,
} from "../controllers/section.controller.js";
// import { loginValidate } from "../utils/validateUser.js";

const router = express.Router();

router.post("/", createSection);
router.get("/", getSection);

export default router;
