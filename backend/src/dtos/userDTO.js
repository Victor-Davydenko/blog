export class UserDTO {
  constructor({
    username, email, id, role, avatar,
  }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
    this.avatar = avatar;
  }
}
