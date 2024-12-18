import { Request, Response } from "express";

export const ping = async (req: Request, res: Response) => {
  return res.sendRes(200, "Working", true);
};
