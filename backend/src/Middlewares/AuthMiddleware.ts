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
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError(401, "No token provided"));
  }

  const token = authHeader.split(" ")[1];


  try {
    const decoded = verifyToken(token);

    // Check if token exists in session table
    const session = await prisma.session.findUnique({
      where: { token },
    });

    if (!session || session.expiresAt < new Date()) {
      return next(new AppError(401, "Session expired or invalid"));
    }

    // Attach user info to request
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error(err);
    next(new AppError(401, "Invalid token"));
  }
}
