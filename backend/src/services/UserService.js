import bcrypt from 'bcrypt';
import UserDbService from './UserDbService.js';
import { UserDTO } from '../dtos/userDTO.js';
import { USER_ROLES } from '../constants/consts.js';

class UserService {
  constructor(userDbService) {
    this.userDbService = userDbService;
  }

  registration = async ({
    email, password, username, role = USER_ROLES.user,
  }) => {
    const candidate = await this.userDbService.findByEmail(email);
    if (candidate) {
      throw new Error('user already exists');
    }
    const hashedPassword = await bcrypt.hash(password, process.env.SALT);
    const newUser = await this.userDbService.createUser({
      email,
      username,
      role,
      password: hashedPassword,
    });
    return new UserDTO(newUser);
  };
}

export default new UserService(UserDbService);
