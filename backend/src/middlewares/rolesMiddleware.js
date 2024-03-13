export const rolesMiddleware = (allowedRoles) => (req, res, next) => {
  const { user } = req;
  if (!user) {
    throw new Error('user is not authenticated');
  }
  if (!allowedRoles.includes(user.role)) {
    next(new Error('You don;t have permission'));
  }
  next();
};
