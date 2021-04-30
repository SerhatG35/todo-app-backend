import {  ExtendableContext } from 'koa';
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

import User, { IUser } from '../models/user';

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


  public static async loginUser(ctx: ExtendableContext){

    const reqBody = ctx.request.body;
    const user = await User.findOne({username : reqBody.auth.username})
    if(!user) {
      ctx.status = 400
      ctx.message = "User doesn't exists"
      return ctx.body = "User doesn't exists"
    }
    try {
        const passwordCheck = await bcrypt.compare(reqBody.auth.password,user.password)
        if(passwordCheck){
          const token = jwt.sign({id:user._id,username:user.username,email:user.email,firstname:user.firstname},"secretkey")
          ctx.body = token
          ctx.set("auth-token",token)
        }
        else{
          ctx.status = 400
          ctx.message = "Invalid password"
          return ctx.body = "Invalid password"
        }
      
    } catch (error) {
      console.log("Error ->", error);
      ctx.body = error.message;
    }
  }
  

  public static async registerUser(ctx: ExtendableContext) {

    const reqBody = ctx.request.body as IUser;
    const emailExists = await User.findOne({email:reqBody.email})
    const usernameExists = await User.findOne({username: reqBody.username})
    if(emailExists) {
      ctx.status = 400
      ctx.message = "Email already exists"
      return ctx.body = "Email already exists"
    }
    if(usernameExists){
      ctx.status = 400
      ctx.message = "Username is taken"
      return ctx.body = "Username is taken"
    }
    try {
      bcrypt.hash(reqBody.password,5,(err,hash) => {
        reqBody.password = hash
      })
      const newUser = await User.create(reqBody);
      ctx.body = newUser;
    } catch (error) {
      console.log('Error ->', error);
      ctx.status = 400;
      ctx.body = error.message;
    }
  }
}
