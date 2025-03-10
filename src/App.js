import React from 'react';
import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Posts from './components/Posts/Posts';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;