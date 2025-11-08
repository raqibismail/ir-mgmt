import express from "express";
import {
  getCurrentUser,
  login,
  logout,
  register,
} from "@Controllers/AuthController";
import { authenticate } from "@Middlewares/AuthMiddleware";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const user = await register(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error); // Pass to error handler middleware
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await login(req.body);
    res.cookie("token", user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error); // Pass to error handler middleware
  }
});

router.post("/logout", authenticate, async (req, res, next) => {
  try {
    const token = req.cookies?.token; // ✅ read from cookie now
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "No token provided" });
    }

    await logout(token);

    // ✅ clear the cookie securely
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });

    res.status(200).json({ success: true, message: "Logged out" });
  } catch (error) {
    next(error);
  }
});

router.post("/me", authenticate, async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    let user;
    if (token) {
      user = await getCurrentUser(token);
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

export default router;
