import express from "express";
import {
  getUsers,
  toggleUserVerification,
  deleteUser,
} from "../controller/admin/user.controller";
import {
  changeTaskStatus,
  createUserTask,
  deleteTask,
  getTask,
  getTasks,
} from "../controller/admin/task.controller";

const router = express.Router();

router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);
router.put("/toggle-user-verification", toggleUserVerification);

router.get("/tasks", getTasks);
router.get("/task/:id", getTask);
router.post("/task", createUserTask);
router.delete("/task/:id", deleteTask);
router.put("/task-state", changeTaskStatus);

export default router;
