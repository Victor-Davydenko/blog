import mongoose, { Schema } from 'mongoose';
import { USER_ROLES } from '../../constants/consts.js';

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  role: {
    type: String,
    default: USER_ROLES.user,
  },
});

export const UserModel = mongoose.model('User', UserSchema);
