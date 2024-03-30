import React, {useContext, useState} from 'react';
import {observer} from 'mobx-react-lite';
import Context from '../../index';
import Input from '../ui/Input';
import Button from '../ui/Button';

const RegistrationForm = () => {
  const { userStore } = useContext(Context);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registrationFormSubmitHandler = () => {
    userStore.registration(username, email, password);
  };

  return (
    <>
      <div className='form-holder login-form'>
        <div className='form-row'>
          <Input onChange={(e) => setUsername(e.target.value)}
            label="Ім'я" name='username' type='text'/>
        </div>
        <div className='form-row'>
          <Input onChange={(e) => setEmail(e.target.value)}
            label='Електронна пошта' name='email' type='text'/>
        </div>
        <div className='form-row'>
          <Input onChange={(e) => setPassword(e.target.value)}
            label='Пароль' name='password' type='password'/>
        </div>
        <div className='form-row button-row'>
          <Button onClick={registrationFormSubmitHandler}>Sign Up</Button>
        </div>
      </div>
    </>
  );
};

export default observer(RegistrationForm);