import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import { registerValidate, loginValidate } from "../utils/validateUser.js";

const router = express.Router();

router.post("/register", registerValidate, register);
router.post("/login", loginValidate, login);
router.post("/logout", logout);

export default router;
