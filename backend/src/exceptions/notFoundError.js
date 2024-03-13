class NotFoundError extends Error {
  constructor(status = 404, message = 'Page not found') {
    super(message);
    this.status = status;
    this.message = message;
  }

  static NotFound(status) {
    return new NotFoundError(status);
  }
}

export default NotFoundError;
