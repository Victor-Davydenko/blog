import ChatService from '../services/ChatService.js';

class ChatController {
  constructor(chatService) {
    this.chatService = chatService;
  }

  newChat = async (req, res, next) => {
    try {
      const { recipient } = req.body;
      const { user: { id } } = req;
      const members = [recipient, id];
      const chat = await this.chatService.newChat(members);
      res.status(201).json({
        chat,
      });
    } catch (e) {
      next(e);
    }
  };

  getChats = async (req, res, next) => {
    try {
      const { user: { id } } = req;
      const chats = await this.chatService.getChats(id);
      res.json({
        status: 200,
        chats,
      });
    } catch (e) {
      next(e);
    }
  };

  newMessage = async (req, res, next) => {
    try {
      const { user: { id } } = req;
      const { text, chatId } = req.body;
      const message = {
        sender: id,
        text,
        chatId,
      };
      const newMessage = await this.chatService.newMessage(message);
      res.status(201).json({
        newMessage,
      });
    } catch (e) {
      next(e);
    }
  };

  getMessages = async (req, res, next) => {
    try {
      const { chatId } = req.body;
      const messages = await this.chatService.getMessages(chatId);
      res.json({
        status: 200,
        messages,
      });
    } catch (e) {
      next(e);
    }
  };
}

export default new ChatController(ChatService);
