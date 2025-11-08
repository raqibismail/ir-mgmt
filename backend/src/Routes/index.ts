import { Router } from "express";
import AuthRoutes from "@Routes/AuthRoutes";
import UserRoutes from "@Routes/UserRoutes";
import ReferralRoutes from "@Routes/ReferralRoutes";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/referrals", ReferralRoutes);

export default router;
