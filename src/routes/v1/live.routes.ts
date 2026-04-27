import { Router } from "express";
import { liveContent } from "../../modules/live/live.controller";

const router = Router();

/**
 * @openapi
 * /content/live/{teacherId}:
 *   get:
 *     tags:
 *       - Live
 *     summary: Get active live content
 *     description: Returns the currently active approved content for a teacher using rotation scheduling.
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: subject
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional subject filter
 *     responses:
 *       200:
 *         description: Active content or no content available
 */
router.get("/live/:teacherId", liveContent);

export default router;