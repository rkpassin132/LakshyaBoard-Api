import Joi from "joi";
import { validateData } from "./common.validation";

export function validateUser(data: any) {
  let schema = {
    name: Joi.string().min(5).max(50),
    phone: Joi.number().min(10),
    email: Joi.string().min(5).max(255).lowercase(),
    password: Joi.string().min(8).max(16).alphanum(),
  };
  return validateData(schema, data);
}
