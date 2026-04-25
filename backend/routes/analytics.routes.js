// routes/analytics.routes.js
import express from "express";
import { getUserAnalytics } from "../controllers/analytics.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// GET /api/analytics - Get user's analytics overview
router.get("/", authMiddleware, getUserAnalytics);

export default router;
