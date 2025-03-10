import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './Header.css'

import { logout } from "../../features/auth/authSlice";

const Header = () => {

  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch();

  return (
    <div>
      <nav className='headerElements'>
        <Link to="/">Home</Link>
        
        <Link to="/posts">Posts</Link>
        {user ? (
          <span onClick={()=>dispatch(logout())
          }>Logout</span>
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