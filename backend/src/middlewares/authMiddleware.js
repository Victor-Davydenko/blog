import passport from 'passport';

const authMiddleware = (strategyName) => (req, res, next) => {
  passport.authenticate(strategyName, { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      throw new Error('User is not authenticated');
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default authMiddleware;
