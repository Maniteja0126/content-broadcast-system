import { Response, NextFunction, } from "express";
import { AuthRequest } from "../../common/middleware/auth.middleware";
import { getMyProfile, getTeachers, } from "./user.service";

export const me = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await getMyProfile(req.user.sub);

    res.status(200).json({
      success: true,
      message:
        "Profile fetched",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const teachers = async (
  _req : any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data =
      await getTeachers();

    res.status(200).json({
      success: true,
      message:
        "Teachers fetched",
      data,
    });
  } catch (error) {
    next(error);
  }
};