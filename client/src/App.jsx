import "./App.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import SignUp from "./pages/SignUpPage/SignUp";
import Home from "./pages/Home/Home";
import Profile from "./pages/profilePage/Profile";
import NavBar from "./components/NavBar/NavBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "../firebase.config";
import Upload from "./pages/UploadPage/Upload";
import { useSelector } from "react-redux/es";
import UserProfile from "./pages/profilePage/UserProfile";
import FeedPage from "./pages/FeedPage.jsx/FeedPage";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <NavBar />
      )}

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
          path="/feed/:id"
          element={<FeedPage />}
        />
        <Route
          exact
          path="/profile/:username"
          element={<UserProfile />}
        />
        <Route
          exact
          path="/profile/:username"
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
