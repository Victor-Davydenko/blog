import React, {useContext} from 'react';
import Context from "../index";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";

const Chats = () => {
  const { userStore } = useContext(Context);
  const user = toJS(userStore.user)

  return (
    <div>
      <ul>
        <li></li>
      </ul>
    </div>
  );
};

export default observer(Chats);