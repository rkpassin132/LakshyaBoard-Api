// import "./startup/logging";
import "./startup/db";
import routeConfig from "./startup/routes";
import express, { Express } from "express";
import helmet from "helmet";
import winston from "winston";

const app: Express = express();
const PORT = process.env.PORT || 4000;
const HOST = process.env.Host || "localhost";

app.use(helmet());
routeConfig(app);

app.listen(3000, HOST, () =>
  winston.info(`Server running on port http://${HOST}:${PORT}`)
);
