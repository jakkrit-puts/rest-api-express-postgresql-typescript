import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../configs";
import { User } from "../models/user.model";

export const SECRET_KEY: Secret = config.JWT_SECRET;

interface JwtPayload {
  id: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    const user = await User.findByPk(decoded.id)

    res.locals.user = user;

    next();
  } catch (err) {
    res.status(401).json({
      message: "unauthorized please login..."
    });
  }
};