class ChatError extends Error {
  constructor(status = 500, message = 'Something went wrong with chat...') {
    super(message);
    this.status = status;
    this.message = message;
  }

  static AlreadyExists(status, message) {
    return new ChatError(status, message);
  }
}

export default ChatError;
