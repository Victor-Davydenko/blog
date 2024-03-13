export const errorMiddleware = (error, req, res, next) => {
  if (error.status !== 500) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
    });
  }
  return res.status(500).json({
    status: 500,
    message: 'An internal error has occurred...',
  });
};
