import React, {useContext, useEffect} from 'react';
import {toJS} from "mobx";
import Context from "../../index";
import {observer} from "mobx-react-lite";

const ChatListItem = ({ chat, onChatPick }) => {
  const { userStore, chatStore: {getChatCompanion, companion} } = useContext(Context);
  const { id } = toJS(userStore.user)
  const myCompanion = toJS(companion)
  const companionId = chat.members.find((userId) => userId !== id);
  useEffect(() => {
    getChatCompanion(companionId)
  }, []);
  return (
    myCompanion ?
      <li onClick={() => onChatPick(chat._id)} className='chats_list_item'>
      <img src={`${process.env.REACT_APP_BASE_URI}/uploads/${myCompanion.avatar}`} alt="avatar" className='userpic'/>
      <span className='username'>{myCompanion.username}</span>
      </li>
      : null
  );
};

export default observer(ChatListItem);