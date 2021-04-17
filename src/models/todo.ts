import * as mongoose from 'mongoose';

export interface ITodo extends mongoose.Document {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export const TodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
  },
  { versionKey: false }
);

const Todo = mongoose.model<ITodo>('Todo', TodoSchema);
export default Todo;
