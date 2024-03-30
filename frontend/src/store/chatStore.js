import {makeAutoObservable} from 'mobx';
import ChatService from "../services/ChatService";

export default class ChatStore {
  chats = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setChats(chats) {
    this.chats = chats;
  }

  async getChats(userId) {
    try {
      const response = await ChatService.getChats(userId);
      this.setChats(response.data.chats);
    }
    catch (e) {
      throw new Error(e);
    }
  }
}