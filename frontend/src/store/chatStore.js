import {makeAutoObservable} from 'mobx';
import ChatService from "../services/ChatService";
import api from "../http";

export default class ChatStore {
  chats = []
  messages =[]
  companion = {}

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setChats(chats) {
    this.chats = chats;
  }

  setMessages(messages) {
    this.messages = messages;
  }

  setCompanion(companion) {
    this.companion = companion;
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

  async getMessages(pickedChat) {
    try {
      const response = await api.get(`/messages/${pickedChat}`)
      this.setMessages(response.data.messages)
    } catch (e) {
      throw new Error(e);
    }
  }

  async getChatCompanion(companionId) {
    const response = await api.get(`user/${companionId}`)
    this.setCompanion(response.data.userProfileData.user)
  }

  async sendMessage(message) {
    try {
      const response = await api.post('/new-message', {...message})
      this.setMessages([...this.messages, response.data.newMessage])
    } catch (e) {
      throw new Error(e)
    }
  }
}