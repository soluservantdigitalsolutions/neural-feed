import "./App.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import SignUp from "./pages/SignUpPage/SignUp";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "../firebase.config";
import Upload from "./pages/UploadPage/FeedUpload";
import { useSelector } from "react-redux/es";
import UserProfile from "./pages/profilePage/UserProfile";
import FeedPage from "./pages/FeedPage.jsx/FeedPage";
import ChatPage from "./pages/ChatPage.jsx/ChatPage";
import TestPage from "./pages/TestPage/TestPage";
import Sidebar from "./components/Sidebar/Sidebar";
import NotesPage from "./pages/NotePage/NotesPage";
import FeedUpload from "./pages/UploadPage/FeedUpload";
import NoteUpload from "./pages/NoteUpload/NoteUpload";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <>
          <NavBar />
          <Sidebar />
        </>
      )}

      <Routes>
        <Route exact path="/register" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/"
          element={currentUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route exact path="/feeds/:id" element={<FeedPage />} />
        <Route exact path="/profile/:username" element={<UserProfile />} />

        <Route
          exact
          path="/upload/feed"
          element={currentUser ? <FeedUpload /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/upload/note"
          element={currentUser ? <NoteUpload /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/chat"
          element={currentUser ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/notes"
          element={currentUser ? <NotesPage /> : <Navigate to="/login" />}
        />

        <Route exact path="/test/:feedId" element={<TestPage />} />
      </Routes>
    </>
  );
}

export default App;
