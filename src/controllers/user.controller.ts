import { ExtendableContext } from 'koa';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import User, { IUser } from '../models/user';
import { Authenticate } from '../Decorators/authenticate';

export default class UserController {
  @Authenticate
  public static async getUsers(ctx: ExtendableContext) {
    try {
      const user = await User.find({});
      ctx.body = user;
    } catch (error) {
      console.log('Error -> ', error);
      ctx.body = error.message;
    }
  }

  public static async loginUser(ctx: ExtendableContext) {
    const reqBody = ctx.request.body;
    const user = await User.findOne({ username: reqBody.auth.username });
    if (!user) {
      return ctx.throw(400,"User doesn't exists")
    }
    try {
      const passwordCheck = await bcrypt.compare(
        reqBody.auth.password,
        user.password
      );
      if (passwordCheck) {
        const token = jwt.sign(
          {
            id: user._id,
            username: user.username,
            email: user.email,
            firstname: user.firstname,
          },
          process.env.SECRET_KEY
        );
        ctx.body = {
          token,
          userName: user.username,
          id: user._id,
        };
        ctx.set("auth-token", token);
      } else {
        return ctx.throw(400,"Invalid password")
      }
    } catch (error) {
      return ctx.throw(400,(error.message))
    }
  }

  public static async registerUser(ctx: ExtendableContext) {
    const reqBody = ctx.request.body as IUser;
    const emailExists = await User.findOne({ email: reqBody.email });
    const usernameExists = await User.findOne({ username: reqBody.username });
    if (emailExists) {
      return ctx.throw(400,"Email already exists")
    }
    if (usernameExists) {
      return ctx.throw(400,"Username is taken")
    }
    try {
      reqBody.password = await bcrypt.hash(reqBody.password, 5);
      const newUser = await User.create(reqBody);
      ctx.body = newUser;
    } catch (error) {
      return ctx.throw(400,(error.message))
    }
  }
}
