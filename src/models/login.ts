import * as mongoose from "mongoose";

export interface ILogin extends mongoose.Document {
  username: string;
  password: string;
}

export const LoginSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Login = mongoose.model<ILogin>("Login", LoginSchema);
export default Login;
