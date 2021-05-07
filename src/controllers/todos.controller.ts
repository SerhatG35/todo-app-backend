import { BaseContext, ExtendableContext } from 'koa';
import { Authenticate } from '../Decorators/authenticate';
import Todo, { ITodo } from '../models/todo';

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

  @Authenticate
  public static async postTodo(ctx: ExtendableContext) {
    try {
      const reqBody = ctx.request.body as ITodo;
      console.log(reqBody);
      const userPostsExist = await Todo.findOne({username:reqBody.username})
      if(userPostsExist){
        // IF USERPOST EXIST UPDATE THAT CARD WITH NEW REQBODY
      }else{
        const result = await Todo.create(reqBody);
        ctx.body = result;
      }

    } catch (error) {
      console.log('Error ->', error);
    }
  }
}
