import UserService from '../services/UserService.js';
import { REFRESH_COOKIE_MAX_AGE } from '../constants/consts.js';

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  registration = async (req, res, next) => {
    try {
      const { body: userData } = req;
      const user = await this.userService.registration({ ...userData });
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
      res.cookie('id', userData.user.id, { httpOnly: true });
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
      await this.userService.setNewUserPassword(user.id, password, user.email);
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
      const { files, user } = req;
      const [file] = files;
      const avatar = await this.userService.uploadAvatar(user.id, file);
      res.status(201).json({
        status: 201,
        message: 'Avatar has been uploaded successfully',
        avatar,
      });
    } catch (e) {
      next(e);
    }
  };

  updateProfile = async (req, res, next) => {
    try {
      const { user: { id } } = req;
      const { body, files } = req;
      const [file] = files;
      const user = await this.userService.updateProfile(body, id, file);
      res.json({
        status: 200,
        message: 'User profile has been updated successfully',
        user,
      });
    } catch (e) {
      next(e);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const { params: { id } } = req;
      const user = await this.userService.deleteUser(id);
      if (!user) {
        res.json({
          status: 200,
          message: 'User does not exist',
        });
      }
      res.status(204).json();
    } catch (e) {
      next(e);
    }
  };

  getUserProfile = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { query } = req;
      const userProfileData = await this.userService.getUserProfile(id, query);
      res.json({
        status: 200,
        message: 'Ok',
        userProfileData,
      });
    } catch (e) {
      next(e);
    }
  };
}

export default new UserController(UserService);
