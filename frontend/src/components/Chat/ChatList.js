import React, {useContext, useEffect, useState} from 'react';
import ChatListItem from "./ChatListItem";
import Context from "../../index";
import {toJS} from "mobx";
import MessageBox from "./MessageBox";

const ChatList = () => {
  const { userStore, chatStore: { chats, getChats, getMessages } } = useContext(Context);
  const { id } = toJS(userStore.user)
  const conversations = toJS(chats)
  const [pickedChat, setPickedChat] = useState(null)
  useEffect(() => {
    getChats(id)
  }, []);
  const onChatPick = (chatId) => {
    setPickedChat(chatId);
  }
  useEffect(() => {
    getMessages(pickedChat)
  }, [pickedChat])
  return (
    <div className='chatpage_inner'>
      <ul className='chats_list'>
        {conversations.length && conversations.map((chat) => <ChatListItem key={chat._id} chat={chat} onChatPick={onChatPick} />)}
      </ul>
      <MessageBox pickedChat={pickedChat}/>
    </div>
  );
};

export default ChatList;