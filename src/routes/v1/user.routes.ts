
import { Router } from "express";
import { auth } from "../../common/middleware/auth.middleware";

import { me, teachers } from "../../modules/user/user.controller";

const router = Router();

/**
 * @openapi
 * /user/me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get current logged-in user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched
 *       401:
 *         description: Unauthorized
 */
router.get("/me", auth, me);

/**
 * @openapi
 * /user/teachers:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all teachers
 *     description: Public endpoint to fetch teachers list for testing live APIs.
 *     responses:
 *       200:
 *         description: Teachers fetched
 */
router.get("/teachers", teachers);

export default router;