import { Request, Response } from "express";
import Joi from "joi";
import { validateData } from "../../validation/common.validation";
import { findUserById } from "../../service/user.service";
import {
  createTask,
  deleteTaskById,
  findAllTask,
  findTaskById,
} from "../../service/task.service";

export const createUserTask = async (req: Request, res: Response) => {
  let validateSchema = {
    assignedTo: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
  };
  const error = validateData(validateSchema, req.body);
  if (error) {
    return res.sendRes(400, "Invalid input!", error);
  }
  let user = await findUserById(req.body.assignedTo);
  if (!user) return res.sendRes(400, "User not exist");

  await createTask({
    ...req.body,
    state: 0,
    created: Date.now(),
  });
  return res.sendRes(200, "Task created");
};

export const getTasks = async (req: Request, res: Response) => {
  let tasks = await findAllTask();
  return res.sendRes(200, "Task list", { tasks });
};

export const getTask = async (req: Request, res: Response) => {
  let validateSchema = {
    id: Joi.string().required(),
  };
  const error = validateData(validateSchema, { id: req.params.id });
  if (error) {
    return res.sendRes(400, "Invalid input!", error);
  }
  let task = await findTaskById(req.params.id);
  return res.sendRes(200, "Task list", { task });
};

export const changeTaskStatus = async (req: Request, res: Response) => {
  let validateSchema = {
    id: Joi.string().required(),
    state: Joi.number().valid(0, 1, 2, 3, 4).required().messages({
      "any.only":
        "The task state must be one of the following options: 0 (No status), 1 (Pending), 2 (Ready), 3 (In progress), or 4 (Done).",
    }),
  };
  const error = validateData(validateSchema, req.body);
  if (error) {
    return res.sendRes(400, "Invalid input!", error);
  }
  let task = await findTaskById(req.body.id);
  if (!task) res.sendRes(400, "Can't find task");

  task!.state = req.body.state;
  task?.save();
  return res.sendRes(200, "Task state updated", { task });
};

export const deleteTask = async (req: Request, res: Response) => {
  let validateSchema = {
    id: Joi.string().required(),
  };
  const error = validateData(validateSchema, { id: req.params.id });
  if (error) {
    return res.sendRes(400, "Invalid input!", error);
  }
  let task = await findTaskById(req.params.id);
  if (!task) return res.sendRes(400, "Task not exist");

  task.deleteOne();
  // await deleteTaskById(req.params.id);
  return res.sendRes(200, "Task deleted");
};
