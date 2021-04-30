import * as jwt from "jsonwebtoken"
import { ExtendableContext } from "koa"

const verifyToken = (ctx: ExtendableContext) => {
    const token = ctx.get("auth-token")
    if(!token) {
        ctx.status = 401
        return ctx.body = "Access denied"
    }
    try {
        const verified = jwt.verify(token,"secretkey")
        ctx.body = verified
    }catch(error){
        ctx.status = 400
        return ctx.body = "Invalid token"
    }
}

export default verifyToken