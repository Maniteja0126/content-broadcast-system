import { Router } from "express";
import { auth } from "../../common/middleware/auth.middleware";
import { allowRoles } from "../../common/middleware/role.middleware";
import {
  approveContent,
  getAllContent,
  getPending,
  rejectContent,
} from "../../modules/admin/admin.controller";

const router = Router();

router.use(auth, allowRoles("principal"));

/**
 * @openapi
 * /admin/content/pending:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get pending content list
 *     description: Returns all content waiting for principal review.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pending content fetched
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Principal only
 */
router.get("/content/pending", getPending);

/**
 * @openapi
 * /admin/content/{id}/approve:
 *   patch:
 *     tags:
 *       - Admin
 *     summary: Approve content
 *     description: Approves pending content and makes it eligible for broadcasting.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Content approved
 *       400:
 *         description: Invalid status or content not found
 */
router.patch("/content/:id/approve", approveContent);

/**
 * @openapi
 * /admin/content/{id}/reject:
 *   patch:
 *     tags:
 *       - Admin
 *     summary: Reject content
 *     description: Rejects pending content with rejection reason.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason
 *             properties:
 *               reason:
 *                 type: string
 *                 example: Incorrect file uploaded
 *     responses:
 *       200:
 *         description: Content rejected
 *       400:
 *         description: Invalid request
 */
router.patch("/content/:id/reject", rejectContent);


/**
 * @openapi
 * /admin/content:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all uploaded content
 *     security:
 *       - bearerAuth: []
 */
router.get("/content", getAllContent);

export default router;