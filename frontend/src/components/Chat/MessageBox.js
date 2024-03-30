import React, {useContext} from 'react';
import Messages from "./Messages";
import Context from "../../index";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import SendMessageForm from "./SendMessageForm";

const MessageBox = ({pickedChat }) => {
  const { chatStore: { messages } } = useContext(Context);
  const allMessages = toJS(messages)
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