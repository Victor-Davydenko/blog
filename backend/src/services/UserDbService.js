import { UserModel } from '../db/models/user.js';

class UserDbService {
  findByEmail = async (email) => UserModel.findOne({ email });

  createUser = async (user) => UserModel.create(user);
}

export default new UserDbService();
