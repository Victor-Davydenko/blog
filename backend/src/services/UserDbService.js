import { UserModel } from '../db/models/user.js';

class UserDbService {
  findByEmail = async (email) => UserModel.findOne({ email });

  createUser = async (user) => UserModel.create(user);

  findByUsername = async (username) => UserModel.findOne({ username });

  findById = async (id) => UserModel.findById(id);

  findByIdAndUpdate = async (id, data) => UserModel.findByIdAndUpdate(id, data);
}

export default new UserDbService();
