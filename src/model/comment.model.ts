import mongoose, { Schema, model } from "mongoose";

export interface CommentInterface {
  taskId: mongoose.Types.ObjectId;
  content: string;
  replies: ReplyInterface;
  user: { type: Schema.Types.ObjectId; ref: "User" };
  created: Date;
}

export interface ReplyInterface {
  content: string;
  user: { type: Schema.Types.ObjectId; ref: "User" };
  created: Date;
}

export const commentSchema = new Schema<CommentInterface>({
  taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
  content: { type: String, required: true },
  replies: [
    {
      _id: true,
      content: { type: String, required: true },
      user: { type: Schema.Types.ObjectId, ref: "User" },
      created: { type: Date, default: Date.now() },
    },
  ],
  user: { type: Schema.Types.ObjectId, ref: "User" },
  created: { type: Date, default: Date.now() },
});

const Comment = model<CommentInterface>("Comment", commentSchema);
export default Comment;
