import User, { IUserDocument } from '../../db/Models/User';
import { SignInInput, SingUpInput } from '../types';
import { signInAction } from '../actions/singInAction';
import { singUpAction } from '../actions/singUpAction';
import redis from '../../util/redis';
import { ObjectId } from 'mongodb';
import { ApolloError } from 'apollo-server';
import { sendEmail } from '../../util/sendMail';
import { sendResetEmail } from '../actions/resetPasswordAction';

interface Input<T> {
  [key: string]: T;
}
type PasswordReset = {
  token: string;
  newPassword: string;
};
export const userResolver = {
  LoginType: {
    __resolveType(obj: any) {
      if (obj.result) {
        return 'Error';
      }

      return 'Login';
    },
  },
  Query: {
    me: async () => {
      return '';
    },
  },
  Mutation: {
    signin: async (
      parent: any,
      { input }: Input<SignInInput>,
      cxt: any,
      info: any
    ) => {
      return signInAction(input);
    },
    signup: async (
      parent: any,
      { input }: Input<SingUpInput>,
      cxt: any,
      info: any
    ) => {
      return await singUpAction(input);
    },

    confirmUser: async (
      parent: any,
      { token }: Input<string>,
      ctx: any,
      info: any
    ) => {
      const userId = await redis.get(token);
      console.log({ userId });

      if (!userId) {
        return false;
      }
      await User.update({ _id: new ObjectId(userId) }, { verified: true });
      redis.del(token);
      return true;
    },
    sendResetPassword: async (
      parent: any,
      { email }: Input<string>,
      ctx: any,
      info: any
    ) => {
      const user = await User.find({ email });
      if (user) {
        sendResetEmail(user[0]);
        return true;
      }
      throw new ApolloError('Usser not found');
    },
    resetPassword: async (
      parent: any,
      { input }: Input<PasswordReset>,
      ctx: any,
      info: any
    ) => {
      const userId = await redis.get(input.token);
      console.log('redis userId', userId);

      if (userId) {
        const user = await User.findById(userId);
        if (user) {
          user.updatePassword(input.newPassword);
          await user.save();
          return true;
        }
      }
    },
  },
  User: {
    // id: (root: IUserDocument) => root._id || root.id,
  },
};
