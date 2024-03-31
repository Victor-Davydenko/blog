class DbError extends Error {
  constructor(e, status = 500, message = 'Something went wrong with fetching from database:') {
    super(message);
    this.status = status;
    this.message = message;
    this.e = e;
  }

  static FailedToFetch(e) {
    return new DbError(e.reason);
  }
}

export default DbError;
