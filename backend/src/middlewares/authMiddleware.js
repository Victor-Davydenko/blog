import passport from 'passport';
import UserApiError from '../exceptions/userApiError.js';

const authMiddleware = (strategyName) => (req, res, next) => {
  passport.authenticate(strategyName, { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      throw UserApiError.UnAuthenticatedError();
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default authMiddleware;
