import bcrypt from 'bcryptjs';
import { Schema, model } from 'mongoose';
import { IUser } from './users_Interface';

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.pre('save', async function () {
  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;
});

export const userModel = model('User', userSchema);
