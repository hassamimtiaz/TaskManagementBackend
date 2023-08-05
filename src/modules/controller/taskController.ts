import mongoose from "mongoose";
import taskModel from "../schema/tasks";

export interface ITaskData {
  name: string;
}

interface ITask {
  _id: mongoose.Types.ObjectId;
  name: string;
}

// Create a task in the database
export async function createTaskInDB(data: ITaskData): Promise<string> {
  const { name } = data;
  const newTask = await taskModel.create({ name });
  return newTask._id.toString();
}

// Fetch all tasks from the database
export async function fetchTasks(): Promise<ITask[]> {
  const tasks = await taskModel.find({}).lean();
  return tasks;
}
