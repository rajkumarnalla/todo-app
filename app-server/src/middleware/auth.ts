import { NextFunction, Request, Response } from "express";
import { decodeAccessToken } from "../utils/token";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        email: string;
      };
    }
  }
}

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    let token = req.headers["authorization"] as string;

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    const authToken = token.split("Bearer ")[1];
    req["user"] = decodeAccessToken(authToken);
    next();
  } catch (err) {
    next(err);
  }
}
