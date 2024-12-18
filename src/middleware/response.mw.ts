import { Request, Response, NextFunction } from "express";

declare module "express-serve-static-core" {
  interface Response {
    sendRes: Function;
  }
  interface Request {
    user: any;
  }
}

export default function (req: Request, res: Response, next: NextFunction) {
  res.sendRes = function (
    statusCode: number = 200,
    message: String = "",
    data: any = null
  ) {
    let responseData: any = {
      success: statusCode == 200 ? true : false,
      message,
    };
    if (!data) {
      return res.status(statusCode).send(responseData);
    }

    let validStatuCode = [200, 201];
    if (validStatuCode.includes(statusCode)) {
      responseData = { ...responseData, ...data };
    } else responseData["errors"] = data;
    return res.status(statusCode).send(responseData);
  };
  next();
}
