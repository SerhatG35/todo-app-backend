import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  username: string;
  email: string;
  password: string;
}

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
