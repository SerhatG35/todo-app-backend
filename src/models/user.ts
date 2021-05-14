import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  firstname: string;
  username: string;
  email: string;
  password: string;
}

export const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: false },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
},{versionKey:false});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
