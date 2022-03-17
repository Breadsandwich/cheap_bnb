import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../LoginForm/LoginFormModal';
import SignupFormModal from '../SignupForm/SignupFormModal';
import './NavBar.css';


const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);


  let sessionLinks;
  // let hostSpot;
  if (sessionUser) {
    sessionLinks = <LogoutButton />;
 
  } else {
    sessionLinks = (
      <div className='login-signup-links'>
        <LoginFormModal to='/login' exact={true}/>
        <SignupFormModal to='/signup' exact={true}/>
      </div>
    )
    // hostSpot = null;
    // publishAndSearch = null;
  }
  return (
    <nav className='nav-container'>
      <ul className='navbar'>
        <li className='home'>
          <NavLink to='/' exact={true} activeClassName='active' >
            Home
          </NavLink>
        </li>

        <li className='session-links'>
          {sessionLinks}
        </li>
      </ul>

    </nav>

  );
}

export default NavBar;
