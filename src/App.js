import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Posts from './components/Posts/Posts';
import Activities from './components/Activities/Activities';
import Profile from './components/Profile/Profile';
import PostDetail from './components/PostDetail/PostDetail';
import Admin from "./components/Admin/Admin";
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="App">
      <div className="background-image-1"></div>
      <div className="background-image-2"></div>
      <div className="background-image-3"></div>
      <div className="background-image-4"></div>
      <BrowserRouter>
        <Header user={user} />
        <Routes>
          {!user ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          ) : (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/posts" element={<Posts/>} />
              <Route path="/activities" element={<Activities/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/post/:id" element={<PostDetail/>} />
              {user?.user?.role === 'admin' && <Route path="/admin" element={<Admin />} />}
              <Route path="*" element={<Navigate to="/home" replace />} />
            </>
          )}
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;