import React from 'react';
import {observer} from "mobx-react-lite";
import ChatList from "../components/Chat/ChatList";

const Chats = () => {
  return (
    <div className='container'>
      <ChatList />
    </div>
  );
};

export default observer(Chats);