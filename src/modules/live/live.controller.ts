import {  Request,Response,NextFunction } from "express";
import { getLiveContent } from "./live.service";

export const liveContent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const teacherId = req.params.teacherId as string;

    const subject = req.query.subject ? String(req.query.subject).trim().toLowerCase() : undefined;
    const data = await getLiveContent({
        teacherId,
        subject,
    });

    if (!data) {
      res.status(200).json({
        success: true,
        message:
          "No content available",
        data: null,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message:
        "Live content fetched",
      data: {
        id: data.id,
        title: data.title,
        subject:
          data.subject,
        description:
          data.description,
        fileUrl:
          data.filePath,
        startTime:
          data.startTime,
        endTime:
          data.endTime,
      },
    });
  } catch (error) {
    next(error);
  }
};