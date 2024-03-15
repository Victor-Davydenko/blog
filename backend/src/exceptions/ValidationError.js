class ValidationError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }

  static NotValidInput(message) {
    return new ValidationError(400, message);
  }
}

export default ValidationError;
