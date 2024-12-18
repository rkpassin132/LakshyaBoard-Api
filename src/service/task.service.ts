import Task, { TaskInterface } from "../model/task.model";

export function createTask(input: TaskInterface) {
  return Task.create(input);
}

export function findAllTask() {
  return Task.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "assignedTo",
        foreignField: "_id",
        as: "assignedToUser",
      },
    },
    {
      $unwind: {
        path: "$assignedToUser",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        state: 1,
        title: 1,
        created: 1,
        "assignedToUser._id": 1,
        "assignedToUser.name": 1,
        "assignedToUser.email": 1,
      },
    },
  ]);
}

export function findTaskById(_id: string) {
  return Task.findById(_id).populate("assignedTo", "name email");
}

export function deleteUserTask(_id: string) {
  return Task.deleteMany({ assignedTo: _id });
}

export function deleteTaskById(_id: string){
    return Task.findByIdAndDelete(_id);
}