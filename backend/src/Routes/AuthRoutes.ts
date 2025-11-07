import express from "express";
import { authenticate } from "@Middlewares/AuthMiddleware";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "@Controllers/AuthController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authenticate, logoutUser);
router.get("/me", authenticate, getCurrentUser);

export default router;
