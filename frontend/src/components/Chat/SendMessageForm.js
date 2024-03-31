import React, {useContext, useState} from 'react';
import Button from "../ui/Button";
import Context from "../../index";
import {observer} from "mobx-react-lite";
import {socketContext} from "../../socket";
import {toJS} from "mobx";

const SendMessageForm = ({pickedChat}) => {
  const { chatStore: { sendMessage, companion }, userStore } = useContext(Context);
  const [message, setMessage] = useState('')
  const user = toJS(userStore.user)
  const socket = useContext(socketContext);
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newMessage = {
      text: message,
      chatId: pickedChat
    }
    const messageData = {
      ...newMessage,
      receiver: companion.id,
      sender: user.id,
    }
    await sendMessage(newMessage)
    socket.emit('message', messageData)
    setMessage('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <input className='message_input' onChange={(e) => setMessage(e.target.value)} value={message}></input>
      <Button type='submit' onClick={handleSubmit}>Send message</Button>
    </form>
  );
};

export default observer(SendMessageForm);