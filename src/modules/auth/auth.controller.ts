
import { Request, Response, NextFunction } from "express";
import { loginSchema, registerSchema } from "./auth.schema";
import { loginUser, registerTeacher } from "./auth.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const body = registerSchema.parse(
      req.body
    );

    const user = await registerTeacher(
        body.name,
        body.email,
        body.password
      );

    res.status(201).json({
      success: true,
      message:
        "Teacher registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const body = loginSchema.parse(
      req.body
    );

    const result = await loginUser(
      body.email,
      body.password
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};