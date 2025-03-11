import React from 'react';
import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Posts from './components/Posts/Posts';
import Activities from './components/Activities/Activities';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts/>} />
          <Route path="/activities" element={<Activities/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;