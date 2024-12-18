import cors from "cors";
import path from "path";
import express, { Application } from "express";
import bodyParser from "body-parser";
import sendResMiddleware from "../middleware/response.mw";
import errorMiddleware from "../middleware/error.mw";
import { authUser, authAdmin } from "../middleware/auth.mw";
import indexRoutes from "../routes/index";
import adminRoutes from "../routes/admin.routes";
import authRoutes from "../routes/auth.routes";
import "./passport";
import passport from "passport";

const __dirname = path.resolve();

export default function (app: Application): void {
  app.use(cors());
  app.use(bodyParser.json({ limit: "30mb" }));
  app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
  app.use(sendResMiddleware);
  app.use("/api/v1", authRoutes);
  app.use(
    "/api/v1/user",
    [passport.authenticate("jwt", { session: false }), authUser],
    indexRoutes
  );

  app.use(
    "/api/v1/admin",
    [passport.authenticate("jwt", { session: false }), authAdmin],
    adminRoutes
  );

  app.use(errorMiddleware);
}
