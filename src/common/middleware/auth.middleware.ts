import { Request , Response , NextFunction } from "express";
import jwt from "jsonwebtoken";
import {config} from "../../config";


export interface AuthRequest extends Request {
    user? : any;
}

export const auth = (
    req : AuthRequest,
    res : Response,
    next : NextFunction
) => {
    const header = req.headers.authorization;

    if(!header?.startsWith("Bearer ")) {
        return res.status(401).json({
            message : "Unauthorized"
        })
    }

    const token = header.split(" ")[1];

    try {
        const decoded = req.user = jwt.verify(token , config.jwt.secret);

        req.user = decoded;
        next();
    }catch{
        return res.status(401).json({
            message : "Invalid token"
        })
    }
}