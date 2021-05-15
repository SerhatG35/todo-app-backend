import { ExtendableContext } from 'koa';
import Todo, { ITodo } from '../models/todo';
import * as jwt from 'jsonwebtoken';
import { Authenticate } from '../decorators/authenticate';
export default class TodosController {
  @Authenticate
  public static async getCards(ctx: ExtendableContext) {
    try {
      const { username } = jwt.decode(ctx.header.authorization.split(' ')[1], {
        json: true,
      });
      const userCards = await Todo.findOne({ username: username });
      ctx.body = userCards;
    } catch (error) {
      ctx.body = error;
    }
  }

  @Authenticate
  public static async updateCards(ctx: ExtendableContext) {
    try {
      const reqBody = ctx.request.body as ITodo;
      console.log(reqBody);
      const userCardExist = await Todo.findOne({ username: reqBody.username });
      if (userCardExist) {
        userCardExist.cards = [...reqBody.cards];
        const result = await userCardExist.save();
        ctx.body = result;
      } else {
        const result = await Todo.create(reqBody);
        ctx.body = result;
      }
    } catch (error) {
      ctx.body = error;
    }
  }

  @Authenticate
  public static async deleteCards(ctx: ExtendableContext) {
    try {
      const todoId = ctx.request.url.split('/')[2];
      const { username } = jwt.decode(ctx.header.authorization.split(' ')[1], {
        json: true,
      });
      const userCardExist = await Todo.findOne({ username });
      if (userCardExist) {
        userCardExist.cards = userCardExist.cards.filter(
          (card) => card._id != todoId
        );
        const result = await userCardExist.save();
        ctx.body = result;
      }
    } catch (error) {
      console.log({ ctxa: ctx.query });
      ctx.body = error;
    }
  }
}
