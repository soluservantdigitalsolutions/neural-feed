import React from "react";
import { CSSTransition } from "react-transition-group";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import testProfilePic from "../../assets/user (1).png";


const ProfileDropdown = ({ isOpen, toggleOpen, children }) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const userData = user.data.user;
  return (
    <div className="relative">
      <button
        onClick={toggleOpen}
        className="flex items-center gap-2"
      >
        <div className="ProfilePicDiv ">
          <img
            src={userData.img ? userData.img : testProfilePic}
            alt="testUser"
            className="rounded-full w-10 h-10 object-cover"
          />
        </div>
        {/* {isOpen ? <AiOutlineUp /> : <AiOutlineDown />} */}
      </button>
      <CSSTransition
        in={isOpen}
        timeout={200}
        classNames="my-node"
        unmountOnExit
      >
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
          {children}
        </div>
      </CSSTransition>
    </div>
  );
};

export default ProfileDropdown;
