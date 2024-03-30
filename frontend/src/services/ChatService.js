import api from '../http';

class ChatService {
  async getChats(userId) {
    return api.get('/chats', { userId });
  }
}

export default new ChatService();