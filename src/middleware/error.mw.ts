import winston from "winston";
import { Request, Response, NextFunction } from "express";

export default function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  winston.error("", err);
  res.sendRes(500, "Something failed.");
  next();
}
