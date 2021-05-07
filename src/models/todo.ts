import * as mongoose from 'mongoose';
import { card } from '../types/types';

export interface ITodo extends mongoose.Document {
  id: string;
  username:string;
  cards: card[]
}

export const TodoSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    username: { type: String, required: true },
    cards: {type:[{title:String,todos:[{todo:String,isCompleted:Boolean}]}], required:true}
  },
  { versionKey: false }
);

const Todo = mongoose.model<ITodo>('Todo', TodoSchema);
export default Todo;
