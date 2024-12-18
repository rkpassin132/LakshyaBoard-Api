import mongoose, { Schema, model } from "mongoose";

export interface TaskInterface {
  state: Number;
  title: string;
  description: string;
  assignedTo?: mongoose.Types.ObjectId;
  created: Date;
}
export const taskSchema = new Schema<TaskInterface>({
  // 0:No status | 1:Pending | 2:Ready | 3:In progress | 4:Done
  state: { type: Number, emum: [0, 1, 2, 3, 4], required: true, default: 0 },
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  created: { type: Date, default: Date.now() },
});

const Task = model<TaskInterface>("Task", taskSchema);
export default Task;
