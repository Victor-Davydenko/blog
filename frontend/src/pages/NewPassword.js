import React, {useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input'


const NewPassword = () => {
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('t');
  const [passwordData, setPasswordData] = useState({});

  const passwordInputHandler = (e) => {
    setPasswordData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  const setNewPasswordHandler = () => {
    console.log(passwordData)
  }
  return (
    <div>
      <Input label='Enter new password' name='password' onChange={(e) => passwordInputHandler(e)} />
      <Input label='Repeat new password' name='repeat' onChange={(e) => passwordInputHandler(e)} />
      <Button onclick={setNewPasswordHandler}>Set New Password</Button>
    </div>
  );
};

export default NewPassword;