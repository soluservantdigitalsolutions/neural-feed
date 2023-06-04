import { useState } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import SignUp from './pages/SignUpPage/SignUp';
import Home from './pages/Home/Home';
import Profile from './pages/profilePage/Profile';
import NavBar from './components/NavBar/NavBar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Auth } from '../firebase.config';
import Upload from './pages/UploadPage/Upload';

function App() {
 

  return (
    <>
      <NavBar />
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
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/upload"
          element={<Upload />}
        />
      </Routes>
    </>
  );
}

export default App;
