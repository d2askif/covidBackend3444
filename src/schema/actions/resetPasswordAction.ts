import User, { IUserDocument } from '../../db/Models/User';
import { createPasswordResetUrl } from '../../util/createResetPassword';
import { sendEmail } from '../../util/sendMail';
import { format } from 'url';

export const restPasswordAction = async (email: string) => {
  const user = await User.find({ email });
  if (user.length > 0) {
    sendResetEmail(user[0]);
  }
};

export const sendResetEmail = async (user: IUserDocument) => {
  const resetUrl = await createPasswordResetUrl(user.id);
  console.log(resetUrl);

  // await sendEmail(user.email, resetUrl);
};
