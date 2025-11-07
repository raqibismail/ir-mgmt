// src/utils/token.ts
import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRY = process.env.JWT_EXPIRY as string || '7D';

export interface JwtPayload {
  id: string;
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET, { complete: false }) as JwtPayload;
}
