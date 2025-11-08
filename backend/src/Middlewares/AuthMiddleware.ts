import dotenv from "dotenv";
dotenv.config();

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./ErrorHandlers";
import prisma from "../../prisma/client";
import { verifyToken } from "@/Utils/token";

const JWT_SECRET = process.env.JWT_SECRET!.trim() as string;

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.token; // ⬅️ read cookie
  if (!token) return next(new AppError(401, "No token provided"));

  try {
    const decoded = verifyToken(token);
    const session = await prisma.session.findUnique({
      where: { token },
    });

    if (!session || session.expiresAt < new Date()) {
      return next(new AppError(401, "Session expired or invalid"));
    }

    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error(err);
    next(new AppError(401, "Invalid token"));
  }
}
