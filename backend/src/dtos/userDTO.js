export class UserDTO {
  constructor({
    username, email, id, role,
  }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
  }
}
