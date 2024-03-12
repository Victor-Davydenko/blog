import UserService from '../services/UserService.js';

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
}

export default new UserController(UserService);
