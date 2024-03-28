class DbError extends Error {
  constructor(status = 500, message = 'Something went wrong with fetching data from database...') {
    super(message);
    this.status = status;
    this.message = message;
  }

  static FailedToFetch() {
    return new DbError();
  }
}

export default DbError;
