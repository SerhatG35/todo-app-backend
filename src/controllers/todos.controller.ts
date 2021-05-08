import { BaseContext, ExtendableContext } from 'koa';
import { Authenticate } from '../decorators/authenticate';
import Todo, { ITodo } from '../models/todo';

export default class TodosController {
  @Authenticate
  public static async getTodos(ctx: BaseContext) {
    try {
      const todos = await Todo.find({});
      ctx.body = todos;
    } catch (error) {
      console.log('Error ->', error);
    }
  }

  @Authenticate
  public static async postTodo(ctx: ExtendableContext) {
    try {
      const reqBody = ctx.request.body as ITodo;
      const userPostsExist = await Todo.findOne({ username: reqBody.username });

      if (userPostsExist) {
        userPostsExist.cards = [...userPostsExist.cards, ...reqBody.cards];

        const result = await userPostsExist.save();
        ctx.body = result;
      } else {
        const result = await Todo.create(reqBody);
        ctx.body = result;
      }
    } catch (error) {
      console.log('Error ->', error);
    }
  }
}

// DeleteCard
// DeleteCardsRow
// UpdateCardsHeader
// UpdateCardsRow
// GetUsersCards
