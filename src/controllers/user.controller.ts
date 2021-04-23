import {  ExtendableContext } from 'koa';
import User, { IUser } from '../models/user';

import * as bcrypt from "bcrypt"
import Login, { ILogin } from '../models/login';

//TODO
//Login
//JWT Implementation
//Register esnasında şifre hashlenecek --> bcrypt

// LOGIN YAPARKEN PW CHECK , HASHLENEN PW DATABASEYE DÜZ GİDİYOR, JWT KALDI

export default class UserController {
  public static async getUsers(ctx: ExtendableContext){
    try {
      const user = await User.find({})
    ctx.body = user
    } catch (error) {
      console.log("Error -> ",error);
      ctx.body = error.message
    }
    
  }
  public static async loginUser(ctx: ExtendableContext,parameter:Record<string, string>){
    // try {
    //   const reqBody = ctx.request.body as ILogin;
    //   const result = await Login.create(reqBody)
    //   console.log(result.username);
    //   console.log(result.password);
    //   ctx.body = reqBody
    // } catch (error) {
    //   console.log("Error ->", error);
    //   ctx.body = error.message;
    // }
    try {
      const user = await User.findOne(parameter)
      ctx.body = user
    } catch (error) {
      console.log("Error ->", error);
      ctx.body = error.message;
    }
  }
  public static async registerUser(ctx: ExtendableContext) {
    try {
      const reqBody = ctx.request.body as IUser;
      const result = await User.create(reqBody);
      const hash = bcrypt.hashSync(result.password,5)
      result.password = hash
      console.log(result);
      ctx.body = result;
    } catch (error) {
      console.log('Error ->', error);
      ctx.status = 400;
      ctx.body = error.message;
    }
  }
}
