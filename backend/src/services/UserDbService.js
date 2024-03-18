import { ObjectId } from 'bson';
import { UserModel } from '../db/models/user.js';

class UserDbService {
  findByEmail = async (email) => UserModel.findOne({ email });

  createUser = async (user) => UserModel.create(user);

  findByUsername = async (username) => UserModel.findOne({ username });

  findById = async (id) => UserModel.findById(id);

  findByIdAndUpdate = async (id, data) => UserModel.findByIdAndUpdate(id, data, { new: true });

  deleteUser = async (id) => (ObjectId.isValid(id) ? UserModel.findByIdAndDelete(id) : null);
}

export default new UserDbService();
