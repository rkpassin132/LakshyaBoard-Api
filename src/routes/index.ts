import express from "express";
import { deleteUser, getUser, updateUser } from "../controller/user.controller";
import { verifyEmail } from "../controller/auth.controller";

const router = express.Router();

router.get("/auth/verify-email", verifyEmail);
router.get("/user", getUser);
router.put("/user", updateUser);
router.delete("/user", deleteUser);

export default router;
