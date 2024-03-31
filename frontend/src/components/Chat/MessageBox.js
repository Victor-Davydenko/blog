import React, {useContext} from 'react';
import Messages from "./Messages";
import Context from "../../index";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import SendMessageForm from "./SendMessageForm";
import {socketContext} from "../../socket";

const MessageBox = ({pickedChat }) => {
  const { chatStore: { messages, setMessages } } = useContext(Context);
  const allMessages = toJS(messages)
  const socket = useContext(socketContext);
  socket.on('get_message', (message) => {
    setMessages([...allMessages, {sender: message.sender, text: message.text, chatId: message.chatId}])
  })
  return (
    <div style={{width: '100%'}}>
      <div className='chatbox'>
        {allMessages.length ? <Messages messages={allMessages}/> : <div>Start conversation...</div>}
      </div>
      <SendMessageForm pickedChat={pickedChat}/>
    </div>
  );
};

export default observer(MessageBox);