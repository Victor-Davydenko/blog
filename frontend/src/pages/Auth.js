import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {Navigate} from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import LoginForm from '../components/LoginForm/LoginForm';
import Context from '../index';
import Switcher from '../components/ui/Switcher';
import {socketContext} from "../socket";

const Auth = () => {
  const { userStore, globalStore } = useContext(Context);
  const socket = useContext(socketContext);

  if (userStore.isAuth) {
    socket.connect()
    socket.emit('user_connected', userStore.user.id)
    return (
      <Navigate to={'/'} />
    );
  }
  return (
    <>
      <Switcher firstTitle={'Увійти'} secondTitle={'Зареєструватися'}/>
      {globalStore.isSwitcherFirstTabVisible
        ? <LoginForm />
        : <RegistrationForm />}
    </>
  );
};

export default observer(Auth);