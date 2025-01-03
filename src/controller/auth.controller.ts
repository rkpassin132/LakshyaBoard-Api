import { Request, Response } from "express";
import User, { UserInterface } from "../model/user.model";
import { random, authentication, sendVerificationEmail } from "../helper";
import Jwt from "jsonwebtoken";
import {
  validateConfirmPasswordSchema,
  validateData,
  validatePasswordSchema,
} from "../validation/common.validation";
import Joi from "joi";
import Constant from "../config/Constant";
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client('713133347914-utpls0v088rj7e5ru24cr79i6rotc98p.apps.googleusercontent.com');

// export const login = async (req: Request, res: Response) => {
//   // validate input
//   let validateSchema = {
//     email: Joi.string().email().required().min(5).max(255).lowercase(),
//     password: validatePasswordSchema(),
//   };
//   const error = validateData(validateSchema, req.body);
//   if (error) {
//     return res.sendRes(400, "Invalid credential!", error);
//   }

//   let user = await findUser({ email: req.body.email }).select(
//     "+salt +password"
//   );
//   if (!user) return res.sendRes(400, "Please enter correct email");
//   const token = Jwt.sign(
//     { email: user.email, _id: user._id },
//     process.env.JWT_SECRET_KEY!
//   );
//   if (!user.verified) {
//     // send verification code
//     try {
//       await sendVerificationEmail(user.email!, token);
//       return res.sendRes(200, "Please verify your account.", {
//         user,
//       });
//     } catch (error) {
//       return res.sendRes(400, "Not able to find user");
//     }
//   }

//   const expectedHash = authentication(user.salt!, req.body.password);
//   if (expectedHash !== user.password) {
//     return res.sendRes(403, "Please enter correct password");
//   }
//   user = user.toObject();
//   delete user.salt;
//   delete user.password;
//   return res.sendRes(200, "User logged in", { user, token });
// };

// export const register = async (req: Request, res: Response) => {
//   // validate input
//   let validateSchema = {
//     name: Joi.string().required().min(5).max(50),
//     phone: Joi.number().min(10),
//     email: Joi.string().email().required().min(5).max(255).lowercase(),
//     password: validatePasswordSchema(),
//     confirm_password: validateConfirmPasswordSchema(),
//   };
//   const error = validateData(validateSchema, req.body);
//   if (error) {
//     return res.sendRes(400, "Invalid input!", error);
//   }

//   // check user already in database
//   let existingUser = await findUser({ email: req.body.email }).select(
//     "+salt +password"
//   );
//   if (existingUser && existingUser.verified) {
//     return res.sendRes(400, "User already exist !");
//   }

//   if (!existingUser) {
//     const salt = random();
//     let password = authentication(salt, req.body.password);
//     req.body = {
//       ...req.body,
//       salt,
//       password,
//       role: Constant.ROLE.User,
//       verified: false,
//       created: Date.now(),
//     };
//     existingUser = await createUser(req.body);
//   }

//   // send verification code
//   try {
//     const token = Jwt.sign(
//       { _id: existingUser._id, email: existingUser.email },
//       process.env.JWT_SECRET_KEY!
//     );
//     await sendVerificationEmail(existingUser.email!, token);
//     console.log(token)
//     let user = existingUser.toObject();
//     delete user.salt;
//     delete user.password;
//     return res.sendRes(200, "Please verify your account. Check you email.", {
//       user,
//     });
//   } catch (error) {
//     return res.sendRes(400, "Not able to register user");
//   }
// };

// export const verifyEmail = async (req: Request, res: Response) => {
//   req.user.verified = true;
//   await updateUserById(req.user);
//   return res.sendRes(200, "Account verified.", { user: req.user });
// };

export const logginWithGoogle = async (req: Request, res: Response) => {
  try{
    const { idToken } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: '713133347914-utpls0v088rj7e5ru24cr79i6rotc98p.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();
    let user = await User.findOne({ email: payload.email }).lean().exec();
    if(!user){
      user = await User.create({
        role: 0,
        email: payload.email,
        name: payload.name,
        firstName: payload.given_name,
        lastName: payload.family_name,
        picture: payload.picture
      });
    }
    const token = Jwt.sign(
      { _id: user._id, email: payload.email },
      process.env.JWT_SECRET_KEY!
    );
    return res.sendRes(200, "Account verified.", { token, role:0 });
  }catch(error){
    return res.sendRes(400, "Not able to register user");
  }
}
