import React, {useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input'
import {setNewPassword} from "../api/api";


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
    setNewPassword(passwordData, accessToken);
  }
  return (
    <div className='page'>
      <div className="reset_password_form">
       <div className='form-row'>
         <Input label='Enter new password' name='password' onChange={(e) => passwordInputHandler(e)} />
       </div>
        <div className='form-row'>
          <Input label='Repeat new password' name='repeat' onChange={(e) => passwordInputHandler(e)} />
        </div>
        <Button onclick={setNewPasswordHandler}>Set New Password</Button>
      </div>
    </div>
  );
};

export default NewPassword;