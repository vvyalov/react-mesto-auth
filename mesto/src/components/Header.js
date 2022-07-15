import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Header({ loggedIn, email, entranceOut }) {
  const location = useLocation()
  return (
    <div className='header'>
      <a href="#"><img src={headerLogo} alt="логотип" className="header__logo" /></a>
      <div className='header__entrance'>
        {loggedIn &&
          <>
            <p className='registered__text'>{email}</p>
            <p className='registered__enter' onClick={entranceOut}>Выйти</p>
          </>}
        {!loggedIn && location.pathname === '/sign-in' && <Link to='/sign-up' className='registered__enter' >Регистрация</Link>}
        {!loggedIn && location.pathname === '/sign-up' && <Link to='/sign-in' className='registered__enter' >Войти</Link>}
      </div>
    </div>
  );
}

export default Header;