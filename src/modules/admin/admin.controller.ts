import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../../common/middleware/auth.middleware";

import {
  approveContentById,
  getPendingContents,
  rejectContentById,
  getAllContents,
} from "./admin.service";

import { rejectSchema } from "./admin.schema";

export const getPending = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await getPendingContents();

    res.status(200).json({
      success: true,
      message: "Pending content fetched",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const approveContent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await approveContentById(
      req.params.id as string,
      req.user.sub
    );

    res.status(200).json({
      success: true,
      message: "Content approved",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const rejectContent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const body = rejectSchema.parse(req.body);

    const result = await rejectContentById(
      req.params.id as string,
      req.user.sub,
      body.reason
    );

    res.status(200).json({
      success: true,
      message: "Content rejected",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllContent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await getAllContents({
      status: req.query.status as string,
      subject: req.query.subject as string,
      teacherId: req.query.teacherId as string,
    });

    res.status(200).json({
      success: true,
      message: "All content fetched",
      data,
    });
  } catch (error) {
    next(error);
  }
};