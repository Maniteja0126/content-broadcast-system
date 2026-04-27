import { Router } from "express";
import authRoutes from "./auth.routes";
import contentRoutes from "./content.routes";
import adminRoutes from "./admin.routes";
import liveRoutes from "./live.routes";
import userRoutes from "./user.routes";

const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *       - System
 *     summary: Health check
 *     responses:
 *       200:
 *         description: API healthy
 */
router.get("/health", (_req, res) => {
    res.json({
      status: "ok",
      version: "v1",
    });  
});

router.use("/auth" , authRoutes);
router.use("/content" , contentRoutes);
router.use("/admin", adminRoutes);
router.use("/content", liveRoutes);
router.use("/user" , userRoutes);



export default router;
