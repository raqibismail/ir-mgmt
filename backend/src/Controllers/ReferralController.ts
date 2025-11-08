import { Request, Response, NextFunction } from "express";
import prisma from "@prisma-client";
import { AppError } from "@/Middlewares/ErrorHandlers";
import { ReferralModel } from "@Models/Referral";

// GET all referrals
export const getAllReferrals = async () => {
  const response = await prisma.referral.findMany({
    orderBy: { createdAt: "desc" },
  });
  return response;
};

// GET single referral by ID
export const getReferralById = async (id: ReferralModel["id"]) => {
  const response = await prisma.referral.findUnique({ where: { id } });
  return response;
};

// CREATE referral
export const createReferral = async (data: ReferralModel) => {
  const response = await prisma.referral.create({ data });
  return response;
};

// UPDATE referral
export const updateReferral = async (
  id: ReferralModel["id"],
  data: ReferralModel
) => {
  const response = await prisma.referral.update({
    where: { id },
    data,
  });
  return response;
};

// DELETE referral
export const deleteReferral = async (id: ReferralModel["id"]) => {
  const response = await prisma.referral.delete({ where: { id } });
  return response;
};
