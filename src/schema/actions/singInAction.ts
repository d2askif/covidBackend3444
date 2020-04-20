import User from '../../db/Models/User';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import { environment } from '../../util/environment';
import { SignInInput } from '../types';
import credential from '../../validators/credentials';
export const signInAction = async (input: SignInInput) => {
  const valid = credential({ username: '', password: 'pass' });
  if (valid) {
    return valid;
  }

  const user = await User.findOne({ email: input.email });

  if (user) {
    const isMatch = await user.comparePassword(input.password);

    if (!user.verified) {
      throw new AuthenticationError('You need to verify your email address');
    }
    if (!isMatch) {
      throw new AuthenticationError('Unauthorized access');
    }
    const token = jwt.sign({ id: user._id }, environment.secret, {
      expiresIn: '1h',
    });
    return { token, user };
  }

  throw new AuthenticationError('Unauthorized access');
};
