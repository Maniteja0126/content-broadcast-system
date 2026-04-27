import { Response,  NextFunction } from "express";
import { AuthRequest } from "../../common/middleware/auth.middleware";
import { uploadContentSchema } from "./content.schema";
import { createContent, getMyContents, } from "./content.service";
import { AppError } from "../../common/utils/AppError";

export const uploadContent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      throw new AppError(
        "File is required",
        400
      );
    }

    const body = uploadContentSchema.parse(req.body);

    if (
      (body.startTime && !body.endTime) ||
      (!body.startTime && body.endTime)
    ) {
      throw new AppError(
        "Both startTime and endTime must be provided together",
        400
      );
    }

    if ( body.startTime && body.endTime && body.startTime >= body.endTime) {
      throw new AppError(
        "endTime must be after startTime",
        400
      );
    }

    const content = await createContent({
        ...body,
        filePath: `/uploads/${req.file.filename}`,
        fileType:
          req.file.mimetype,
        fileSize:
          req.file.size,
        uploadedById:
          req.user.sub,
      });

    res.status(201).json({
      success: true,
      message:
        "Content uploaded successfully",
      data: content,
    });
  } catch (error) {
    next(error);
  }
};

export const myContents = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log(req.user);
  
      const userId = req.user?.sub;
  
      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Invalid user token",
        });
      }
  
      const data = await getMyContents(userId);
  
      res.status(200).json({
        success: true,
        message: "My contents fetched",
        data,
      });
    } catch (error) {
      next(error);
    }
};