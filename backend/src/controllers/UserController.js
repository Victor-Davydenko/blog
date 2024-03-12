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
      res.cookie('refresh', userData.tokens.refreshToken, { maxAge: REFRESH_COOKIE_MAX_AGE, httpOnly: true });
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
}

export default new UserController(UserService);
