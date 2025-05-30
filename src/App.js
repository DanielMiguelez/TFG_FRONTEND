import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { BrowserRouter, Route, Routes } from "react-router-dom";

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
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
        <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts/>} />
          <Route path="/activities" element={<Activities/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/post/:id" element={<PostDetail/>} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        
        <Footer/>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={3000} />

    </div>
  );
}

export default App;