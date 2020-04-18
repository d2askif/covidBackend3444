import mongoose from 'mongoose';
const bookModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    subtitle: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Book', bookModel);
