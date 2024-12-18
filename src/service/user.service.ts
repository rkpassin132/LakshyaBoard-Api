import User, { UserInterface } from "../model/user.model";

export function createUser(input: UserInterface) {
  return User.create(input);
}

export function findAllUser() {
  return User.find();
}

export function findUser(input: UserInterface) {
  return User.findOne(input);
}

export function findUserById(_id: string) {
  return User.findById(_id);
}

export function updateUserById(input: UserInterface) {
  return User.findByIdAndUpdate(input._id, input);
}

export function deleteUserById(_id: string) {
  return User.findByIdAndDelete(_id);
}
