import { SingUpInput } from '../types';
import User from '../../db/Models/User';
import { ApolloError } from 'apollo-server';
export const singUpAction = async (input: SingUpInput) => {
  const user = await User.findOne({ email: input.email });
  if (user) {
    return new ApolloError('Email already exists, try logging');
  }

  const newUser = await User.create(input);

  return newUser;
};
