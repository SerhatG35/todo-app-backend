import { BaseContext, ExtendableContext } from 'koa';
import User, { IUser } from '../models/user';

//TODO
//Login
//JWT Implementation
//Register esnasında şifre hashlenecek --> bcrypt

export default class UserController {
  public static async register(ctx: ExtendableContext) {
    try {
      const reqBody = ctx.request.body as IUser;
      const result = await User.create(reqBody);
      ctx.body = result;
    } catch (error) {
      console.log('Error ->', error);
      ctx.status = 400;
      ctx.body = error.message;
    }
  }
}
