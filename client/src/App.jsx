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
import NotesPage from "./pages/NotePage/NotesPage";
import FeedUpload from "./pages/UploadPage/FeedUpload";
import NoteUpload from "./pages/NoteUpload/NoteUpload";
import BottomNavbar from "./components/BottomNavbar/BottomNavbar";
import NoteContent from "./pages/NoteContent/NoteContent";
import NoteTestPage from "./pages/NoteTestPage/NoteTestPage";
import SearchPage from "./pages/Search/SearchPage";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <>
          <NavBar />
        </>
      )}

      <Routes>
        <Route exact path="/register" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route  path="/" element={<Home />} />
        <Route exact path="/feeds/:id" element={<FeedPage />} />
        <Route exact path="/profile/:username" element={<UserProfile />} />
        <Route exact path="/upload/feed" element={<FeedUpload />} />
        <Route exact path="/upload/note" element={<NoteUpload />} />
        <Route exact path="/chat" element={<ChatPage />} />
        <Route exact index path="/notes" element={<NotesPage />} />
        <Route exact path="/notes/:id" element={<NoteContent />} />
        <Route exact path="/feeds/tests/:feedId" element={<TestPage />} />
        <Route exact path="/notes/tests/:noteId" element={<NoteTestPage />} />
      </Routes>
      {!location.pathname.startsWith("/login") &&
        !location.pathname.startsWith("/register") &&
        !location.pathname.startsWith("/feeds/") &&
        !location.pathname.startsWith("/notes/") &&
        !location.pathname.startsWith("/feeds/tests/") &&
        !location.pathname.startsWith("/chat") &&
        !location.pathname.startsWith("/notes/tests/") && <BottomNavbar />}
    </>
  );
}

export default App;
