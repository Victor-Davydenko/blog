import { USER_ROLES } from '../constants/consts.js';
import UserApiError from '../exceptions/userApiError.js';

export const checkIfAllowedDeleteAccount = (req, res, next) => {
  const { user: { id, role } } = req;
  const { params: { id: accountId } } = req;
  if (role === USER_ROLES.admin) {
    return next();
  } if (id === accountId) {
    return next();
  }
  return next(UserApiError.WithoutPermissons());
};
