import UserService from '../services/UserService.js';
import { REFRESH_COOKIE_MAX_AGE } from '../constants/consts.js';

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  registration = async (req, res, next) => {
    try {
      const { username, password, email } = req.body;
      const user = await this.userService.registration({ username, password, email });
      res.status(201).json({
        status: 201,
        message: 'User has been successfully created!',
        user,
      });
    } catch (e) {
      next(e);
    }
  };

  login = async (req, res, next) => {
    try {
      const credentials = req.body;
      const userData = await this.userService.login(credentials);
      res.header('Authorization', `Bearer ${userData.tokens.accessToken}`);
      res.cookie('refreshToken', userData.tokens.refreshToken, { maxAge: REFRESH_COOKIE_MAX_AGE, httpOnly: true });
      res.json({
        status: 200,
        message: 'User successfully logged in',
        token: userData.tokens.accessToken,
        user: userData.user,
      });
    } catch (e) {
      next(e);
    }
  };

  refreshToken = async (req, res, next) => {
    try {
      const { user } = req;
      const tokens = await this.userService.refreshToken(user);
      res.header('Authorization', `Bearer ${tokens.accessToken}`);
      res.cookie('refreshToken', tokens.refreshToken, { maxAge: REFRESH_COOKIE_MAX_AGE, httpOnly: true });
      res.json({
        status: 200,
        message: 'User successfully logged in',
        token: tokens.accessToken,
      });
    } catch (e) {
      next(e);
    }
  };

  logout = (req, res, next) => {
    try {
      res.removeHeader('Authorization');
      res.clearCookie('refreshToken');
      res.json({
        status: 200,
        message: 'User successfully logged out',
      });
    } catch (e) {
      next(e);
    }
  };

  resetUserPassword = async (req, res, next) => {
    try {
      const { email } = req.body;
      await this.userService.resetUserPassword(email);
      res.json({
        status: 200,
        message: `Email with instructions for resetting password has been sent to ${email}`,
      });
    } catch (e) {
      next(e);
    }
  };

  newUserPassword = async (req, res, next) => {
    try {
      const { user } = req;
      const { password } = req.body;
      await this.userService.setNewUserPassword(user.id, password);
      res.status(201).json({
        status: 201,
        message: 'Password successfully updated',
      });
    } catch (e) {
      next(e);
    }
  };

  uploadAvatar = async (req, res, next) => {
    try {
      const { file, user } = req;
      const avatar = await this.userService.uploadAvatar(user.id, file);
      res.status(201).json({
        status: 201,
        message: 'Avatar has been uploaded successfully',
        avatar,
      });
    } catch (e) {
      next();
    }
  };
}

export default new UserController(UserService);
