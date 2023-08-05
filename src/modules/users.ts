import { Schema, model, Document } from "mongoose";
import { IUserData } from "../controller/userController";

export interface UserDocument extends Document, IUserData {}

const UsersSchema = new Schema<IUserData>({
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
});

const userModel = model<UserDocument>("users", UsersSchema);

export default userModel;
