import { BaseContext, ExtendableContext } from 'koa';
import Todo, { ITodo } from '../models/todo';

//Kullanıcıya ait TODO CRUD yap.
//Todo id'ye göre clientta görüntüle.
//verify token check olacak ardından post paylaşılabilecek
export default class TodosController {

  public static async getTodos(ctx: BaseContext) {
    try {
      const todos = await Todo.find({});
      console.log(todos);
      ctx.body = todos;
    } catch (error) {
      console.log('Error ->', error);
    }
  }

  public static async postTodo(ctx: ExtendableContext) {
    try {
      const reqBody = ctx.request.body as ITodo;
      const result = await Todo.create(reqBody);
      ctx.body = result;
    } catch (error) {
      console.log('Error ->', error);
    }
  }
}
