import mongoose, { Schema, model } from "mongoose";

export interface UserInterface {
  _id?: mongoose.Types.ObjectId;
  role?: number;
  name?: String;
  email?: string;
  verified?: Boolean;
  password?: String;
  salt?: String;
  created?: Date;
}

export const userSchema = new Schema<UserInterface>({
  // 0: Admin, 1:User
  role: { type: Number, enum: [0, 1], ref: "Role", required: true, default: 1 },
  name: { type: String, required: true, min: 5, max: 100, trim: true },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 255,
    lowercase: true,
    trim: true,
    unique: true,
  },
  verified: { type: Boolean, default: false, required: true },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 16,
    select: false,
  },
  salt: { type: String, select: false },
  created: { type: Date, default: Date.now() },
});

const User = model<UserInterface>("User", userSchema);
export default User;
