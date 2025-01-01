import express from "express";
import { ping } from "../controller/app.controller";
import * as authController from "../controller/auth.controller";

const router = express.Router();

router.get("/ping", ping);

// router.post("/auth/login", authController.login);
// router.post("/auth/register", authController.register);
router.post("/auth/loginWithGoogle", authController.logginWithGoogle);

export default router;
