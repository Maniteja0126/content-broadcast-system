import { Router } from "express";
import { auth } from "../../common/middleware/auth.middleware";
import { allowRoles } from "../../common/middleware/role.middleware";
import { upload } from "../../common/upload/multer";
import { myContents, uploadContent } from "../../modules/content/content.controller";

const router = Router();

/**
 * @openapi
 * /content/upload:
 *   post:
 *     tags:
 *       - Content
 *     summary: Upload content (Teacher only)
 *     description: Upload JPG/PNG/GIF content with scheduling metadata.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - subject
 *               - file
 *             properties:
 *               title:
 *                 type: string
 *                 example: Maths Sheet
 *               subject:
 *                 type: string
 *                 example: Maths
 *               description:
 *                 type: string
 *                 example: Weekly worksheet
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *               rotationDurationMin:
 *                 type: integer
 *                 example: 5
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Content uploaded successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Only teachers can upload
 */
router.post(
  "/upload",
  auth,
  allowRoles("teacher"),
  upload.single("file"),
  uploadContent
);


/**
 * @openapi
 * /content/my:
 *   get:
 *     tags:
 *       - Content
 *     summary: Get teacher uploaded content
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/my",
  auth,
  allowRoles("teacher"),
  myContents
);

export default router;