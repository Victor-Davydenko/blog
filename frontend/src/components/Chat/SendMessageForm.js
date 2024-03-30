import React, {useContext, useState} from 'react';
import Button from "../ui/Button";
import Context from "../../index";
import {observer} from "mobx-react-lite";

const SendMessageForm = ({pickedChat}) => {
  const { chatStore: { sendMessage } } = useContext(Context);
  const [message, setMessage] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    const newMessage = {
      text: message,
      chatId: pickedChat
    }
    sendMessage(newMessage)
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