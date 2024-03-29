import React, { useState } from "react";
import Logo from "../Logo/Logo";
import FormInput from "../formInput/FormInput";
import SubmitBtn from "../SubmitButton/SubmitBtn";
import { FaRegHandPaper } from "react-icons/fa";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import { Auth } from "../../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillNotification } from "react-icons/ai";
import DropdownMenu from "../ProfileDropdown/ProfileDropdown";
import { signOut } from "firebase/auth";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es";
import { logout } from "../../redux/userSlice";
import { useEffect } from "react";
import { getUserProfile } from "../../api/api";

const NavBar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(Auth);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser) {
        try {
          const userData = await getUserProfile(currentUser._id);
          setUserProfile(userData);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  const handleLogout = async (req, res) => {
    try {
      await axios.post(
        "https://neural-feed-backend-2yg8.onrender.com/api/auth/logout"
      );
      // localStorage.setItem("currentUser", null);
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="border flex justify-between items-center p-3">
      <div className="LogoDiv   ">
        <Logo />
      </div>
      {/* <div className="SearchBarDiv">
        <Link to="/search">
          <SubmitBtn ButtonText="SEARCH" className="p-1" />
        </Link>
      </div> */}
      <div className="UploadMessageNotificationsAndProfilediv flex items-center justify-center gap-2">
        {currentUser ? (
          <>
            <div className="UploadDiv hidden md:block">
              <Link to="/upload/feed">
                <SubmitBtn ButtonText="+ FEED" className="p-1" />
              </Link>
            </div>
            <div className="UploadDiv hidden md:block">
              <Link to="/upload/note">
                <SubmitBtn ButtonText="+ NOTE" className="p-1" />
              </Link>
            </div>

            <div className="UploadDiv lg:block md:block  ">
              <Link to="/chat">
                <SubmitBtn ButtonText=" CHAT" className="" />
              </Link>
            </div>

            {/* <div className="MessagesDiv">
              <FaRegHandPaper className="text-2xl cursor-pointer" />
            </div>
            <div className="Notifications">
              <AiFillNotification className="text-2xl" />
            </div> */}
            <div className="flex gap-1 text-green-600 items-center">
              <ProfileDropdown
                isOpen={isDropdownOpen}
                toggleOpen={toggleDropdown}
              >
                <div className="py-2">
                  <div className="block px-4 py-2 text--800 transition ">
                    Welcome Back <b>{currentUser.user.username}</b>!
                  </div>
                  <div className="UploadDiv lg:hidden md:hidden  ">
                    <Link to="/upload/feed">
                      <SubmitBtn ButtonText="+ FEED" className="" />
                    </Link>
                  </div>
                  <div className="UploadDiv lg:hidden md:hidden  ">
                    <Link to="/upload/note">
                      <SubmitBtn ButtonText="+ NOTE" className="" />
                    </Link>
                  </div>

                  <Link
                    to={`/profile/${currentUser.user.username}`}
                    className="block px-4 py-2 text--800 hover:bg-green-600 transition hover:text-white"
                    onClick={toggleDropdown}
                  >
                    Your Profile
                  </Link>
                  {/* <Link
                  to="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                >
                  Settings
                </Link> */}

                  <div
                    onClick={() =>
                      window.open(
                        "https://mail.google.com/mail/?view=cm&fs=1&to=soluservant@gmail.com",
                        "_blank"
                      )
                    }
                    className="block px-4 py-2 text--800 hover:bg-green-600 transition hover:text-white cursor-pointer"
                  >
                    Send Feedback
                  </div>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-red-800 hover:bg-red-600 transition hover:text-white"
                    onClick={handleLogout}
                  >
                    Log Out
                  </Link>
                </div>
              </ProfileDropdown>
            </div>
          </>
        ) : (
          <div className="LoginButtonDiv flex gap-1">
            <Link to="/login">
              <SecondaryButton SecondaryButtonText="Login" />
            </Link>
            <Link to="/register">
              <SecondaryButton SecondaryButtonText="Enroll" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
