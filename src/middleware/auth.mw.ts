import { Request, Response, NextFunction } from "express";
import Constant from "../config/Constant";

export function authUser(req: Request, res: Response, next: NextFunction) {
  if (req.user.role !== Constant.ROLE.User) {
    return res.sendRes(401, "Access denied. Only for users");
  }
  next();
}

export function authAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user.role !== Constant.ROLE.Admin) {
    return res.sendRes(401, "Access denied. Only for admin");
  }
  next();
}
