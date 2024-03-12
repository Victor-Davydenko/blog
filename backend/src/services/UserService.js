import bcrypt from 'bcrypt';
import UserDbService from './UserDbService.js';
import TokenService from './TokenService.js';
import { UserDTO } from '../dtos/userDTO.js';
import { USER_ROLES } from '../constants/consts.js';

class UserService {
  constructor(userDbService, tokenService) {
    this.userDbService = userDbService;
    this.tokenService = tokenService;
  }

  registration = async ({
    email, password, username, role = USER_ROLES.user,
  }) => {
    const candidate = await this.userDbService.findByEmail(email);
    if (candidate) {
      throw new Error('user already exists');
    }
    const hashedPassword = await bcrypt.hash(password, +process.env.SALT);
    const newUser = await this.userDbService.createUser({
      email,
      username,
      role,
      password: hashedPassword,
    });
    return new UserDTO(newUser);
  };

  login = async ({ username, password }) => {
    const user = await this.userDbService.findByUsername(username);
    if (!user) {
      throw new Error('Username or password is invalid');
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error('Username or password is invalid');
    }
    const userDTO = new UserDTO(user);
    const tokens = await this.tokenService.generateTokens({ ...userDTO });
    return {
      tokens,
      user: userDTO,
    };
  };
}

export default new UserService(UserDbService, TokenService);
