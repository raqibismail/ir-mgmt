import express from "express";
import {
  getAllReferrals,
  getReferralById,
  createReferral,
  updateReferral,
  deleteReferral,
} from "@Controllers/ReferralController.js";
import { authenticate } from "@Middlewares/AuthMiddleware.js";

const router = express.Router();

router.use(authenticate);
router.get("/", getAllReferrals);
router.get("/:id", getReferralById);
router.post("/", createReferral);
router.put("/:id", updateReferral);
router.delete("/:id", deleteReferral);

export default router;
