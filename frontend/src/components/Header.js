import React, {useContext} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import Context from '../index';
import Button from './ui/Button';
import logo from '../assets/logo.png'

const Header = () => {
  const { userStore } = useContext(Context);
  const navigate = useNavigate();
  const logoutBtnHandler = () => {
    navigate('/');
    userStore.logout();
  };
  return (
    <header className='header'>
      <div className="container ">
        <div className="logo">
          <NavLink to={'/'}>
            <img src={logo} alt="logo" className="logo-img"/>
          </NavLink>
        </div>
        <div className="nav-wrapper">
          <nav className="nav">
            <ul className='nav-list'>
              <li className="nav-list__item"><NavLink to={'/'}>Головна</NavLink></li>
              {!userStore.isAuth && <li className="nav-list__item"><NavLink to={'/auth'}>Sign In</NavLink></li>}
            </ul>
          </nav>
          {userStore.isAuth && <Button type='submit' onclick={() => logoutBtnHandler()}>Logout</Button>}
        </div>
      </div>
    </header>
  );
};

export default observer(Header);