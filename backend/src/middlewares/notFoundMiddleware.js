import NotFoundError from '../exceptions/notFoundError.js';

export const notFoundMiddleware = (req, res, next) => next(NotFoundError.NotFound());
