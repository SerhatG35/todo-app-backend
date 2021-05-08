import { ParameterizedContext } from 'koa';
import * as jwt from 'jsonwebtoken';

type verifiedUser =
  | {
      id: string;
      username: string;
      email: string;
    }
  | undefined
  | null;

export function Authenticate(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalFn = target[propertyKey];
  descriptor.value = function (ctx: ParameterizedContext) {
    try {
      const token = ctx.header.authorization.split(' ')[1];
      const verified = jwt.verify(
        token,
        process.env.SECRET_KEY
      ) as verifiedUser;
      if (verified) return originalFn.call(this, ctx);
    } catch (error) {
      return ctx.throw(401, 'Authentication failed');
    }
  };
}
