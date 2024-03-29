import api from '../http';

class AuthService {
  async registration(username, email, password) {
    return api.post('/registration', { username, email, password });
  }

  async login(email, password) {
    return api.post('/login', { email, password });
  }

  async logout() {
    return api.get('/logout');
  }
}

export default new AuthService();