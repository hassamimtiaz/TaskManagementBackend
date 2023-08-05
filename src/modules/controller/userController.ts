import mongoose from "mongoose";
import userModel from "../schema/users";

export interface IUserData {
  email: string;
  password: string;
}

type ReturnUser = Promise<string | boolean>;

export async function createUser(data: IUserData): ReturnUser{
  const { email, password } = data;
  const existingUser = await userModel.collection.findOne({ email });
  if(existingUser) {
    return false;
  }
  const user = await userModel.collection.insertOne({ email, password });
  return user?.insertedId.toString();
}

export async function verifyUserPassword(data: IUserData): ReturnUser {
  const { email, password } = data;
  const user = await userModel.collection.findOne({ email });
  if(!user || user?.password !== password) return false;
  return user._id.toString();
}

export async function fetchUser(id: string) {
  return userModel.findById({ _id: new mongoose.Types.ObjectId(id) });
}
