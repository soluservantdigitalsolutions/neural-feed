import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import SignUp from "./pages/SignUpPage/SignUp";
import Home from "./pages/Home/Home";
import Profile from "./pages/profilePage/Profile";
import NavBar from "./components/NavBar/NavBar";
import Upload from "./pages/UploadPage/Upload";

function App() {
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
          element={<Home />}
        />
        <Route
          exact
          path="/profile/:id"
          element={<Profile />}
        />
        <Route
          exact
          path="/upload"
          element={<Upload />}
        />
      </Routes>
    </>
  );
}

export default App;
