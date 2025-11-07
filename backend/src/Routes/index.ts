import { Router } from "express";
import AuthRoutes from "@Routes/AuthRoutes";
import UserRoutes from "@Routes/UserRoutes";
import ReferralRoutes from "@Routes/ReferralRoutes";

const router = Router();

// Define all routes here - similar to Laravel's api.php
const routes = [
  { path: "/auth", router: AuthRoutes },
  { path: "/users", router: UserRoutes },
  { path: "/referrals", router: ReferralRoutes },
];

// Register all routes dynamically
routes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
