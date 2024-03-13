export const validationMiddleware = (schema) => (req, res, next) => {
  const userData = req.body;

  const { error } = schema.validate(userData);
  if (error) {
    next(new Error(error.message));
  }

  next();
};
