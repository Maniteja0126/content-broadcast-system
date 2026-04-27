import jwt from "jsonwebtoken";
import { config } from "../../config";

export const signAccessToken = (payload: object) => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};