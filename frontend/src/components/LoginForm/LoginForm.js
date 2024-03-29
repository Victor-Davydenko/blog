import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';
import Context from '../../index';
import Button from "../ui/Button";
import Input from "../ui/Input";

const LoginForm = () => {
  const { userStore } = useContext(Context);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginFormSubmitHandler = () => {
    console.log(email, password)
    userStore.login(email, password);
  };

  return (<>
    <div className='form-holder login-form'>
      <div className='form-row'>
        <Input onChange={(e) => setEmail(e.target.value)}
               label='Електронна пошта'
               name='email'
               type='text'
        />
      </div>
      <div className='form-row'>
        <Input onChange={(e) => setPassword(e.target.value)}
               name='password'
               label='Пароль'
               type='password'/>
      </div>
      <div className='form-row button-row'>
        <Button onclick={loginFormSubmitHandler}>Sign In</Button>
      </div>
    </div>
  </>);
};

export default observer(LoginForm);