import User, { IUserDocument } from '../../db/Models/User';
import { SignInInput, SingUpInput } from '../types';
import { signInAction } from '../actions/singInAction';
import { singUpAction } from '../actions/singUpAction';

interface Input<T> {
  input: T;
}
export const userResolver = {
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
  },
  User: {
    // id: (root: IUserDocument) => root._id || root.id,
  },
};
