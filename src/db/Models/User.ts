import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUserDocument extends Document {
  email: string;
  firstName: string;
  lastName: string;
  comparePassword(pass: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    //@ts-ignore
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      //@ts-ignore
      user.password = hash;
      next();
    });
  });
});

userSchema.method('comparePassword', function (
  candidatePassword: string
): Promise<boolean> {
  console.log('compare');
  return new Promise((resolve, rejects) => {
    //@ts-ignore

    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) return rejects(err);
      resolve(isMatch);
    });
  });

  /* //@ts-ignore
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  }); */
});
// Export the model and return your IUser interface
const user = mongoose.model<IUserDocument, IUserModel>('User', userSchema);
export default user;
