import { ObjectId } from 'bson';
import { UserModel } from '../db/models/user.js';
import DbError from '../exceptions/dbError.js';

class UserDbService {
  findByEmail = async (email) => {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (e) {
      throw DbError.FailedToFetch();
    }
  };

  createUser = async (user) => {
    try {
      const userData = await UserModel.create(user);
      return userData;
    } catch (e) {
      throw DbError.FailedToFetch();
    }
  };

  findByUsername = async (username) => {
    try {
      const user = UserModel.findOne({ username });
      return user;
    } catch (e) {
      throw DbError.FailedToFetch();
    }
  };

  findById = async (id) => {
    try {
      const user = await UserModel.findById(id);
      return user;
    } catch (e) {
      throw DbError.FailedToFetch();
    }
  };

  findByIdAndUpdate = async (id, data) => {
    try {
      const user = await UserModel.findByIdAndUpdate(id, data, { new: true });
      return user;
    } catch (e) {
      throw DbError.FailedToFetch();
    }
  };

  deleteUser = async (id) => {
    try {
      return (ObjectId.isValid(id) ? UserModel.findByIdAndDelete(id) : null);
    } catch (e) {
      throw DbError.FailedToFetch();
    }
  };
}

export default new UserDbService();
