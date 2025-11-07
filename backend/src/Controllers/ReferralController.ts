import { Request, Response, NextFunction } from "express";
import prisma from "@prisma/client";
import { AppError } from "@/Middlewares/ErrorHandlers";

// GET all referrals
export const getAllReferrals = async (req: Request, res: Response) => {
  try {
    const referrals = await prisma.referral.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(referrals);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch referrals", error });
  }
};

// GET single referral by ID
export const getReferralById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const referral = await prisma.referral.findUnique({ where: { id } });
    if (!referral) return new AppError(404, "Referral not found");
    res.json(referral);
  } catch (error) {
    return new AppError(500, "Error fetching referral");
  }
};

// CREATE referral
export const createReferral = async (req: Request, res: Response) => {
  try {
    const referral = await prisma.referral.create({ data: req.body });
    res.status(201).json(referral);
  } catch (error) {
    return new AppError(400, "Failed to create referral");
  }
};

// UPDATE referral
export const updateReferral = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const referral = await prisma.referral.update({
      where: { id },
      data: req.body,
    });
    res.json(referral);
  } catch (error) {
    return new AppError(400, "Failed to update referral");
  }
};

// DELETE referral
export const deleteReferral = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.referral.delete({ where: { id } });
    res.json({ message: "Referral deleted successfully" });
  } catch (error) {
    return new AppError(400, "Failed to delete referral");
  }
};
