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

const NavBar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(Auth);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser);

  const handleLogout = async (req, res) => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="border flex  justify-between items-center p-3">
      <div className="LogoDiv">
        <Logo />
      </div>
      <div className="SearchBarDiv">
        <FormInput
          inputType="Search"
          inputPlaceholder="Looking For..."
          Label="Search"
          LabelForName="Search"
          inputName="Search"
        />
      </div>
      <div className="UploadMessageNotificationsAndProfilediv flex items-center justify-center gap-2">
        <div className="UploadDiv">
          <Link to="upload">
            <SubmitBtn
              ButtonText="+ FEED"
              className="p-1"
            />
          </Link>
        </div>
        <div className="MessagesDiv">
          <FaRegHandPaper className="text-2xl cursor-pointer" />
        </div>
        <div className="Notifications">
          <AiFillNotification className="text-2xl" />
        </div>
        {currentUser ? (
          <div className="flex gap-1 items-center">
            <ProfileDropdown
              isOpen={isDropdownOpen}
              toggleOpen={toggleDropdown}
            >
              <div className="py-2">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                >
                  Your Profile
                </Link>
                {/* <Link
                  to="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                >
                  Settings
                </Link> */}
                <Link
                  to="/"
                  className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                  onClick={handleLogout}
                >
                  Log Out
                </Link>
              </div>
            </ProfileDropdown>
          </div>
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
