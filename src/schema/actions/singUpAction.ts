import { SingUpInput } from '../types';
import User from '../../db/Models/User';
import { ApolloError } from 'apollo-server';
import { environment } from '../../util/environment';
import { sendEmail } from '../../util/sendMail';
import { createConfirmationUrl } from '../../util/createConfirmationUrl';
import jwt from 'jsonwebtoken';
export const singUpAction = async (input: SingUpInput) => {
  const user = await User.findOne({ email: input.email });
  if (user) {
    return new ApolloError('Email already exists, try logging');
  }

  const newUser = await User.create(input);
  const url = await createConfirmationUrl(newUser._id);
  await sendEmail(input.email, url);
  const token = jwt.sign({ id: newUser._id }, environment.secret, {
    expiresIn: '10h',
  });

  return token;
};
