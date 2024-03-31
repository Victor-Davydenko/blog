import { ChatModel } from '../db/models/chat.js';
import DbError from '../exceptions/dbError.js';
import ChatError from '../exceptions/chatError.js';
import { MessageModel } from '../db/models/message.js';

class ChatDbService {
  newChat = async (members) => {
    try {
      await ChatModel.create({ members });
    } catch (e) {
      if (e.message === 'Chat already exists') {
        throw ChatError.AlreadyExists(400, 'The chat with these users already exists');
      } else {
        throw DbError.FailedToFetch();
      }
    }
  };

  getChats = async (id) => {
    try {
      const chats = ChatModel.find({
        members: {
          $in: [id],
        },
      });
      return chats;
    } catch (e) {
      throw DbError.FailedToFetch();
    }
  };

  newMessage = async (message) => {
    try {
      const newMessage = await MessageModel.create({ ...message });
      return newMessage;
    } catch (e) {
      throw DbError.FailedToFetch();
    }
  };

  getMessages = async (chatId) => {
    try {
      const messages = MessageModel.find({ chatId });
      return messages;
    } catch (e) {
      throw DbError.FailedToFetch();
    }
  };
}

export default new ChatDbService();
