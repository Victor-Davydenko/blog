import ChatDbService from './ChatDbService.js';

class ChatService {
  constructor(chatDbService) {
    this.chatDbService = chatDbService;
  }

  newChat = async (members) => {
    const chat = await this.chatDbService.newChat(members);
    return chat;
  };

  getChats = async (id) => {
    const chats = await this.chatDbService.getChats(id);
    return chats;
  };

  newMessage = async (message) => {
    const newMessage = await this.chatDbService.newMessage(message);
    return newMessage;
  };

  getMessages = async (chatId) => {
    const messages = await this.chatDbService.getMessages(chatId);
    return messages;
  };
}

export default new ChatService(ChatDbService);
