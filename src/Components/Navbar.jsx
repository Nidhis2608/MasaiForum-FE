import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { clearUser } from '../Redux/actions/authActions';
import { useDispatch } from 'react-redux';

const NavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/signin'); 
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0C359E',
    color: '#fff',
    padding: '0rem',
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 0.5rem',
  };

  return (
    <nav style={navStyle}>
      <h1 style={{ fontSize: "50px" }}>Masai Forum</h1>
      {['/', '/signin'].includes(location.pathname) && (
        <>
          <NavLink to="/" style={linkStyle}>Signup</NavLink>
          <NavLink to="/signin" style={linkStyle}>Login</NavLink>
        </>
      )}

      {location.pathname === '/feeds' && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
};

export default NavBar;
