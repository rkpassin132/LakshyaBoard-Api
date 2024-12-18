import express from "express";
import { ping } from "../controller/app.controller";
import { login, register } from "../controller/auth.controller";

const router = express.Router();

router.get("/ping", ping);

router.post("/auth/login", login);
router.post("/auth/register", register);

export default router;
