import User from '../../db/Models/User';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import { environment } from '../../util/environment';
import { SignInInput } from '../types';
export const signInAction = async (input: SignInInput) => {
  const user = await User.findOne({ email: input.email });

  if (user) {
    const token = jwt.sign({ id: user._id }, environment.secret, {
      expiresIn: '1h',
    });
    return { token, user };
  }

  return new AuthenticationError('Unauthorized access');
};
