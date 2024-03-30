import React, {useContext} from 'react';
import Context from "../../index";
import {toJS} from "mobx";
import defaultAvatar from '../../assets/default.jpg'

const Messages = ({ messages }) => {
  const { userStore, chatStore } = useContext(Context);
  const user = toJS(userStore.user)
  const companion = toJS(chatStore.companion)
  const userAvatar = user.avatar ? `${process.env.REACT_APP_BASE_URI}/uploads/${user.avatar}` : defaultAvatar
  const companionAvatar = companion.avatar ? `${process.env.REACT_APP_BASE_URI}/uploads/${companion.avatar}` : defaultAvatar
  return (
    <ul>
      {messages.map((message) => {
        const userpic = message.sender === user.id ? userAvatar : companionAvatar
        const name = message.sender === user.id ? user.username : companion.username
        return <li key={message._id} className='message'>
          <div>
            <img src={userpic} alt="avatar" className='userpic'/>
            <span className='username'>{name}</span>
          </div>
          <span className='message_text'>{message.text}</span>
        </li>
      })}
    </ul>
  );
};

export default Messages;