import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import SignUp from './pages/SignUpPage/SignUp';
import Home from './pages/Home/Home';
import Profile from './pages/profilePage/Profile';

function App() {
  return (
    <>
      <Routes>
        <Route
          index
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<SignUp />}
        />
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/user"
          element={<Profile />}
        />
      </Routes>
    </>
  );
}

export default App;
