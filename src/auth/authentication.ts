import { Collection } from 'mongodb';

const HEADER_REGEX = /bearer token-(.*)$/;

/**
 * This is an extremely simple token. In real applications make
 * sure to use a better one, such as JWT (https://jwt.io/).
 */
export default async (cxt: any, Users: Collection) => {
  const authorization: string = cxt.req.headers.authorization;
  // @ts-ignore
  const email = authorization && HEADER_REGEX.exec(authorization)[1];

  return email && (await Users.findOne({ email }));
};
