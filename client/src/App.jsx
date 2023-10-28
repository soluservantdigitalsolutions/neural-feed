import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import SignUp from "./pages/SignUpPage/SignUp";
import Home from "./pages/Home/Home";
import Profile from "./pages/profilePage/Profile";
import NavBar from "./components/NavBar/NavBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "../firebase.config";
import Upload from "./pages/UploadPage/Upload";
import { useSelector } from "react-redux/es";

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          exact
          path="/register"
          element={<SignUp />}
        />
        <Route
          exact
          path="/login"
          element={<Login />}
        />
        <Route
          exact
          path="/"
          element={currentUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/profile/:id"
          element={currentUser ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/upload"
          element={currentUser ? <Upload /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
