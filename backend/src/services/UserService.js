import bcrypt from 'bcrypt';
import UserDbService from './UserDbService.js';
import TokenService from './TokenService.js';
import { UserDTO } from '../dtos/userDTO.js';
import { USER_ROLES } from '../constants/consts.js';
import UserApiError from '../exceptions/userApiError.js';

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
      throw UserApiError.UserAlreadyExists();
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
      throw UserApiError.BadCredentials();
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw UserApiError.BadCredentials();
    }
    const userDTO = new UserDTO(user);
    const tokens = await this.tokenService.generateTokens({ ...userDTO });
    return {
      tokens,
      user: userDTO,
    };
  };

  refreshToken = async (user) => {
    if (!user) {
      throw UserApiError.UnAuthenticatedError();
    }

    const userFromDB = await this.userDbService.findById(user.id);
    const userDTO = new UserDTO(userFromDB);
    const tokens = await this.tokenService.generateTokens({ ...userDTO });
    return tokens;
  };
}

export default new UserService(UserDbService, TokenService);
