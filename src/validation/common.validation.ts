import Joi, { Schema, ValidationResult } from "joi";
import mongoose, { Types } from "mongoose";

const ObjectId: typeof Types.ObjectId = mongoose.Types.ObjectId;

export function validateObjectId(_id: string): true | string {
  if (ObjectId.isValid(_id) && String(new ObjectId(_id)) === _id) return true;
  else return "Invalid objectId";
}

export function validateData(
  schema: any,
  data: any
): Record<string, string> | null {
  schema = Joi.object().keys(schema).unknown(false);
  let { error } = schema.validate(data, { abortEarly: false });
  if (!error) return null;

  let errorMessages: any = {};
  for (let err of error.details) errorMessages[err.context.label] = err.message;
  return errorMessages;
}

export function validatePasswordSchema() {
  return Joi.string()
    .min(8)
    .max(16)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
    )
    .required()
    .messages({
      "string.base": "Password should be a type of text",
      "string.empty": "Password cannot be empty",
      "string.min": "Password should have a minimum length of {#limit}",
      "string.max": "Password should have a maximum length of {#limit}",
      "string.pattern.base":
        "Password must contain at least 1 number, 1 special character, 1 lowercase letter, and 1 uppercase letter",
      "any.required": "Password is required",
    });
}

export function validateConfirmPasswordSchema() {
  return Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm Password must match the Password",
    "string.empty": "Confirm Password cannot be empty",
    "any.required": "Confirm Password is required",
  });
}
