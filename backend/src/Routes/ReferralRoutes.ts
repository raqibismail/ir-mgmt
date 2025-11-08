import express from "express";
import {
  getAllReferrals,
  getReferralById,
  createReferral,
  updateReferral,
  deleteReferral,
} from "@Controllers/ReferralController";
import { authenticate } from "@Middlewares/AuthMiddleware";
import { AppError } from "@Middlewares/ErrorHandlers";

const router = express.Router();

router.get("/", authenticate, async (req, res, next) => {
  try {
    const response = await getAllReferrals();
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    next(new AppError(500, "Failed to fetch referrals"));
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const response = await getReferralById(req.params.id);
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    next(new AppError(500, "Failed to fetch referral"));
  }
});

router.post("/", authenticate, async (req, res, next) => {
  try {
    const response = await createReferral(req.body);
    res.status(201).json({ success: true, data: response });
  } catch (error) {
    next(new AppError(400, "Failed to create referral"));
  }
});

router.put("/:id", authenticate, async (req, res, next) => {
  try {
    const response = await updateReferral(req.params.id, req.body);
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    next(new AppError(400, "Failed to update referral"));
  }
});

router.delete("/:id", authenticate, async (req, res, next) => {
  try {
    await deleteReferral(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(new AppError(400, "Failed to delete referral"));
  }
});

export default router;
