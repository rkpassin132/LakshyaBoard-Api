import { Request, Response } from "express";
import { validateUser } from "../validation/user.validation";
import {
  findAllUser,
  findUserById,
  updateUserById,
  deleteUserById,
} from "../service/user.service";

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  let user = await findUserById(req.user._id);
  if (!user) return res.sendRes(400, "Not able find this user");
  return res.sendRes(200, "User detail", { user });
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const error = validateUser(req.body);
  req.body._id = req.user._id;
  let user = await updateUserById(req.body);
  if (!user) return res.sendRes(400, "Not able find this user");
  user = await findUserById(req.user._id);
  return res.sendRes(200, "User detail", { user });
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  let user = await deleteUserById(req.user._id);
  if (!user) return res.sendRes(400, "Not able find this user");
  return res.sendRes(200, "User deleted");
};
