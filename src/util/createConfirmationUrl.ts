import { v4 } from 'uuid';
import redis from './redis';

export const createConfirmationUrl = async (userId: string) => {
  const token = v4();
  await redis.set(token, userId, 'EX', 60 * 60 * 12);
  return `http://localhost:3000/user/confirm/${token}`;
};
