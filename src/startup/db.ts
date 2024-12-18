import { json } from "body-parser";
import mongoose, { connect } from "mongoose";
import winston from "winston";

(async function () {
  mongoose.Promise = Promise;
  mongoose.connect(process.env.DB_CONNECTION_URL!);
  mongoose.connection.on("error", (error: Error) => {
    winston.error(
      "Some error occur in Database connection !\n" + error.message
    );
  });
})();
