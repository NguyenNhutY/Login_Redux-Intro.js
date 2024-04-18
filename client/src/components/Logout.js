import React from 'react';
import './Logout.css';
import { logout, selectUser } from '../features/userSlice.js'; // Fixed import path

import { useSelector, useDispatch } from 'react-redux';

const Logout = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch(); // Moved useDispatch outside handleLogout

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className="logout">
      <h1>
        Welcome <span className="user__name">{user.name}</span>
      </h1>
      <button className="logout__button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
