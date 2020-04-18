import { Collection } from 'mongodb';
import User, { IUserModel } from '../db/Models/User';

const HEADER_REGEX = /bearer token-(.*)$/;

/**
 * This is an extremely simple token. In real applications make
 * sure to use a better one, such as JWT (https://jwt.io/).
 */
export default async (cxt: any) => {
  const authorization: string = cxt.req.headers.authorization;
  // @ts-ignore
  const email = authorization && HEADER_REGEX.exec(authorization)[1];
  const user = await User.findOne();
  if (user) {
    user.firstName = '';
    user.save();
  }
  return email && (await User.find());
};
