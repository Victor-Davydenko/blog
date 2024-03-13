import UserApiError from '../exceptions/userApiError.js';

export const rolesMiddleware = (allowedRoles) => (req, res, next) => {
  const { user } = req;
  if (!user) {
    throw UserApiError.UnAuthenticatedError();
  }
  if (!allowedRoles.includes(user.role)) {
    next(UserApiError.WithoutPermissons());
  }
  next();
};
