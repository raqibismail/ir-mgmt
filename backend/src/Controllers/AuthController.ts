import dotenv from "dotenv";
dotenv.config();

import prisma from "@prisma/client";
import bcrypt from "bcrypt";
import { UserModel } from "@Models/User";
import { AppError } from "@Middlewares/ErrorHandlers";
import jwt from "jsonwebtoken";
import { generateToken, verifyToken } from "@Utils/token";
import { Request, Response } from "express";

const JWT_EXPIRY_DAYS = process.env.JWT_EXPIRY
  ? parseInt(process.env.JWT_EXPIRY)
  : 7;

// Define input/output types
export type RegisterInput = {
  email: string;
  name: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type SafeUser = Omit<UserModel, "password">;

// REGISTER
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return new AppError(400, "Missing required fields");
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new AppError(400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    const { password: _, ...safeUser } = user;
    res.status(201).json({ success: true, data: safeUser });
  } catch (error) {
    return new AppError(500, "Registration failed");
  }
};

// LOGIN
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return new AppError(404, "User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return new AppError(401, "Invalid credentials");

    const token = generateToken({ id: user.id });
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + JWT_EXPIRY_DAYS);

    await prisma.session.create({
      data: { userId: user.id, token, expiresAt },
    });

    const { password: _, ...safeUser } = user;

    res.status(200).json({ success: true, data: { user: safeUser, token } });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

// LOGOUT
export const logoutUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return new AppError(400, "Missing token");

    let payload;
    payload = verifyToken(token);
    await prisma.session.deleteMany({
      where: { token, userId: payload.id },
    });

    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token", error });
  }
};

// GET CURRENT USER
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return new AppError(401, "Missing token");

    const payload = verifyToken(token);

    const session = await prisma.session.findUnique({ where: { token } });
    if (!session) return new AppError(401, "Session expired or not found");

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    if (!user) return new AppError(404, "User not found");

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    return new AppError(500, "Failed to fetch current user");
  }
};
