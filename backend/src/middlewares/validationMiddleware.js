import ValidationError from '../exceptions/ValidationError.js';

export const validationMiddleware = (schema) => (req, res, next) => {
  const userData = req.body;

  const { error } = schema.validate(userData);
  if (error) {
    next(ValidationError.NotValidInput(error.message));
  }

  next();
};
