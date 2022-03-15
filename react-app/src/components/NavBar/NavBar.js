import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';


const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);


  let sessionLinks;
  let hostSpot;
  if (sessionUser) {
    sessionLinks = <LogoutButton />;
    hostSpot = (
        <>
            <button>host</button>
        </>
    )
    // publishAndSearch = (
    //   <>
    //     <SearchBar />

    //   </>
    // )
  } else {
    sessionLinks = (
      <div className='login-signup-links'>
        <NavLink to='/login' exact={true} activeClassName='active'>
          Login
        </NavLink>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
      </div>
    )
    hostSpot = null;
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
