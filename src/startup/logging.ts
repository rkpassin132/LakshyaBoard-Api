import "express-async-errors";
import winston from "winston";

(function (): void {
  winston.addColors({
    error: "red",
    warn: "yellow",
    info: "white",
    success: "green",
  });

  winston.exceptions.handle(
    new winston.transports.File({ filename: "exceptions.log" })
  );

  winston.add(
    new winston.transports.File({
      filename: "error.log",
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
      ),
    })
  );

  if (process.env.NODE_ENV === "development") {
    winston.add(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.simple()
        ),
      })
    );
  }
})();