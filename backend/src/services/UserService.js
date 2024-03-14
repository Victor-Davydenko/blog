import bcrypt from 'bcrypt';
import UserDbService from './UserDbService.js';
import TokenService from './TokenService.js';
import { UserDTO } from '../dtos/userDTO.js';
import { USER_ROLES } from '../constants/consts.js';
import UserApiError from '../exceptions/userApiError.js';
import MailService from './MailService.js';

class UserService {
  constructor(userDbService, tokenService, mailService) {
    this.userDbService = userDbService;
    this.tokenService = tokenService;
    this.mailService = mailService;
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
    const tokens = this.tokenService.generateTokens({ ...userDTO });
    return tokens;
  };

  resetUserPassword = async (email) => {
    const userData = await this.userDbService.findByEmail(email);
    if (!userData) {
      throw UserApiError.BadCredentials();
    }
    const userDTO = new UserDTO(userData);
    const resetPasswordToken = this.tokenService.generateResetPasswordToken({ ...userDTO });
    await this.mailService.sendResetPasswordEmail('acc.davydenko@gmail.com', resetPasswordToken);
  };
}

export default new UserService(UserDbService, TokenService, MailService);
