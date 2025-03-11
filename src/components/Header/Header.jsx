import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './Header.css'

import { logout } from "../../features/auth/authSlice";

const Header = () => {

  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate("/login")
    }, 1000);
  }

  return (
    <div>
      <nav className='headerElements'>
        <Link to="/">Home</Link>
        
        <Link to="/posts">Posts</Link>
        <Link to="/activities">Activities</Link>
        {user ? (
          <>
          <Link to="/profile">Profile</Link>
          <span onClick={onLogout}>Logout</span>
          
          </>
          
        ) : 
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link> 
        </>

        }

      </nav>
    </div>
  )
}

export default Header