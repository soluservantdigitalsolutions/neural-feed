import React, { useState } from "react";
import Logo from "../Logo/Logo";
import FormInput from "../formInput/FormInput";
import SubmitBtn from "../SubmitButton/SubmitBtn";
import { FaRegHandPaper } from "react-icons/fa";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import { Auth } from "../../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillNotification } from "react-icons/ai";
import DropdownMenu from "../DropdownMenu.jsx/DropdownMenu";
import { signOut } from "firebase/auth";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
// import { Logout } from '../../pages/Home/Home';
import { useAuthContext } from "../../hooks/useAuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  // const [user] = useAuthState(Auth);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
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
        {user ? (
          <div className="ProfileImage flex items-center gap-2">
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-10 rounded-full cursor-pointer"
              onClick={() => {
                setToggleDropdown(!toggleDropdown);
                console.log("HELLO");
              }}
            />
            <div>{user.email}</div>
            <div className="logoutBtn border rounded border-red-600 flex justify-center items-center font-bold">
              <button
                onClick={handleLogout}
                className="text-red-600 text-lg p-1 hover:bg-red-600 transition hover:text-white"
              >
                Logout
              </button>
            </div>
            {/* <button className="border rounded border-red-600 flex justify-center items-center p-1 gap-1 font-bold" onClick={signOutUser}>
              <AiOutlineLogout className="text-2xl text-red-600 " />
              <span className='text-red-600'>Log out</span>
            </button> */}
            {toggleDropdown && (
              <DropdownMenu
                onClick={() => {
                  setToggleDropdown(false);
                  // signOutUser();
                }}
              />
            )}
          </div>
        ) : (
          <div className="LoginButtonDiv flex gap-1">
            <a href="/login">
              <SecondaryButton SecondaryButtonText="Login" />
            </a>
            <a href="/register">
              <SecondaryButton SecondaryButtonText="Enroll" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
