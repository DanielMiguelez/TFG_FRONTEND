import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './Header.css'
import { HomeOutlined, LoginOutlined, UserAddOutlined, UserOutlined, LogoutOutlined, FileTextOutlined, CalendarOutlined } from '@ant-design/icons';

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
    <div className='headerParent'>
      <nav className='headerElements'>

        <Link to="/home">  <HomeOutlined /> Home</Link>

        <Link to="/posts">  <FileTextOutlined /> Posts</Link>
        <Link to="/activities">   <CalendarOutlined /> Activities</Link>
        {user ? (
          <>

            {console.log(user)}
            {user?.user?.role === 'admin' ? <span><Link to="/admin">Admin</Link></span> : ''}
            <Link to="/profile"> <UserOutlined /> Profile</Link>
            <span onClick={onLogout}>  <LogoutOutlined /> Logout</span>

          </>

        ) :
          <>
            <Link to="/login"> <LoginOutlined /> Login</Link>
            <Link to="/register">   <UserAddOutlined /> Register</Link>
          </>

        }

      </nav>
    </div>
  )
}

export default Header