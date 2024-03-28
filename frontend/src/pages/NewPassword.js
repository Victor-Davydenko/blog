import React, {useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input'
import {setNewPassword} from '../api/api';


const NewPassword = () => {
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('t');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const setNewPasswordHandler = () => {
    const passwordData = {
      password,
      repeat: repeatPassword,
    };
    setNewPassword(passwordData, accessToken);
    setPassword('');
    setRepeatPassword('');
  };
  
  return (
    <div className='page'>
      <div className="reset_password_form">
       <div className='form-row'>
         <Input label='Enter new password' name='password' onChange={(e) => setPassword(e.target.value)} value={password} />
       </div>
        <div className='form-row'>
          <Input label='Repeat new password' name='repeat' onChange={(e) => setRepeatPassword(e.target.value)} value={repeatPassword} />
        </div>
        <Button onclick={setNewPasswordHandler}>Set New Password</Button>
      </div>
    </div>
  );
};

export default NewPassword;