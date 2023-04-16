import express from "express";
import {
  register,
  login,
  logout,
  users,
  updateUser,
} from "../controllers/auth.controller.js";
import { registerValidate, loginValidate } from "../utils/validateUser.js";

const router = express.Router();

router.post("/register", registerValidate, register);
router.post("/login", loginValidate, login);
router.post("/logout", logout);
router.get("/users", users);
router.put("/:id", updateUser);

export default router;
