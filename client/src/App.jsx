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
import ProtectedRoute from "./utils/ProtectedRoutes";
import Announcements from "./components/Announcements/Announcements";
import EditProfile from "./pages/EditProfile/EditProfile";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  return (
    <>
      <Announcements />
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <>
          <NavBar />
        </>
      )}

      <Routes>
        <Route exact path="/register" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route
          exact
          path="/feeds/:id"
          element={<ProtectedRoute element={<FeedPage />} />}
        />
        <Route
          exact
          path="/profile/:username"
          element={<ProtectedRoute element={<UserProfile />} />}
        />
        <Route
          exact
          path="/upload/feed"
          element={<ProtectedRoute element={<FeedUpload />} />}
        />
        <Route
          exact
          path="/upload/note"
          element={<ProtectedRoute element={<NoteUpload />} />}
        />
        <Route
          exact
          path="/chat"
          element={<ProtectedRoute element={<ChatPage />} />}
        />
        <Route
          exact
          path="/notes"
          element={<ProtectedRoute element={<NotesPage />} />}
        />
        <Route
          exact
          path="/notes/:id"
          element={<ProtectedRoute element={<NoteContent />} />}
        />
        <Route
          exact
          path="/feeds/tests/:feedId"
          element={<ProtectedRoute element={<TestPage />} />}
        />
        <Route
          exact
          path="/notes/tests/:noteId"
          element={<ProtectedRoute element={<NoteTestPage />} />}
        />
        <Route
          exact
          path="/profile/edit"
          element={<ProtectedRoute element={<EditProfile />} />}
        />
      </Routes>
      {!location.pathname.startsWith("/login") &&
        !location.pathname.startsWith("/register") &&
        !location.pathname.startsWith("/feeds/") &&
        !location.pathname.startsWith("/notes/") &&
        !location.pathname.startsWith("/feeds/tests/") &&
        !location.pathname.startsWith("/chat") &&
        !location.pathname.startsWith("/notes/tests/") &&
        !location.pathname.startsWith("/profile/edit") &&
        !location.pathname.startsWith("/upload/feed") && <BottomNavbar />}
    </>
  );
}

export default App;
