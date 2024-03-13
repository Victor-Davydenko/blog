class UserApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }

  static UserAlreadyExists() {
    return new UserApiError(400, 'User with this username is already exists...');
  }

  static BadCredentials() {
    return new UserApiError(400, 'Username or password is invalid');
  }

  static UnAuthenticatedError() {
    return new UserApiError(401, 'User is not authenticated');
  }

  static WithoutPermissons() {
    return new UserApiError(403, 'You do not have permissions, contact admins');
  }
}

export default UserApiError;
