import { Schema, model, Document } from "mongoose";
import { ITaskData } from "../controller/taskController";

interface TaskDocument extends Document, ITaskData {}

const TasksSchema = new Schema<ITaskData>({
  name: {
    required: true,
    type: String,
  },
});

const taskModel = model<TaskDocument>("tasks", TasksSchema);

export default taskModel;
