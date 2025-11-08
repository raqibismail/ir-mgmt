import "dotenv/config";
import prisma from "@prisma-client";
import bcrypt from "bcrypt";
import { UserModel } from "@Models/User";
import { AppError } from "@Middlewares/ErrorHandlers";
import { generateToken, verifyToken } from "@Utils/token";

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

export async function register(data: RegisterInput): Promise<SafeUser> {
  // Validate input
  if (!data.email || !data.password || !data.name) {
    throw new AppError(400, "Missing required fields");
  }

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new AppError(400, "User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: hashedPassword,
    },
  });

  // Remove password from response
  const { password, ...safeUser } = user;
  return safeUser;
}

export async function login(data: LoginInput) {
  console.log("[login] started with:", data);
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) throw new AppError(404, "Incorrect email or password");

  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  console.log("[login] password valid:", isPasswordValid);

  if (!isPasswordValid) throw new AppError(401, "Invalid credentials");

  const token = generateToken({ id: user.id });
  console.log("[login] token generated");

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.session.create({
    data: {
      userId: user.id,
      token,
      expiresAt,
    },
  });
  console.log("[login] session created");

  const { password, ...safeUser } = user;
  console.log("[login] returning success");
  return { user: safeUser, token };
}

export async function logout(token: string) {
  if (!token) throw new AppError(400, "Missing token");

  let payload;
  try {
    payload = verifyToken(token); // still verify for safety
  } catch {
    throw new AppError(401, "Invalid or expired token");
  }

  const deletedSession = await prisma.session.deleteMany({
    where: { token, userId: payload.id },
  });

  if (deletedSession.count === 0) {
    throw new AppError(404, "Session not found or already logged out");
  }

  return { message: "Logout successful" };
}

export async function getCurrentUser(token: string) {
  if (!token) {
    throw new AppError(401, "Missing token");
  }

  let payload;
  try {
    payload = verifyToken(token);
  } catch (err) {
    throw new AppError(401, "Invalid or expired token");
  }

  // Check if session still exists (token not revoked)
  const session = await prisma.session.findUnique({
    where: { token },
  });

  if (!session) {
    throw new AppError(401, "Session not found or expired");
  }

  // ✅ Get user info (use findUnique with userId)
  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) throw new AppError(404, "User not found");

  return user;
}
