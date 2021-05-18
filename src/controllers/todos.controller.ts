import { ExtendableContext } from 'koa';
import Todo from '../models/todo';
import * as jwt from 'jsonwebtoken';
import { Authenticate } from '../decorators/authenticate';
import { Todos } from '../types/types';
export default class TodosController {
  @Authenticate
  public static async deleteTodo(ctx: ExtendableContext) {
    try {
      const titleToSearch = decodeURI(ctx.request.url.split('/')[2]);
      const todoToDelete = decodeURI(ctx.request.url.split('/')[3]);
      const { username } = jwt.decode(ctx.header.authorization.split(' ')[1], {
        json: true,
      });
      let modifiedTodo: Todos[] = [];
      const userCardExist = await Todo.findOne({ username });
      if (userCardExist) {
        userCardExist.cards.forEach((card) => {
          if (card.title === titleToSearch) {
            card.todos = card.todos.filter(
              (todo) => todo.todo !== todoToDelete
            );
            modifiedTodo = card.todos;
          }
        });
        const result = await userCardExist.save();
        ctx.body = result;
      }
    } catch (error) {}
  }
}
