import express from "express";
import { createFamily, getFamily } from "../controllers/family.controller.js";
import { loginValidate } from "../utils/validateUser.js";
import { isAuth } from "../utils/Auth.js";
const router = express.Router();

router.post("/", createFamily);
router.get("/:id", isAuth, getFamily);

export default router;
