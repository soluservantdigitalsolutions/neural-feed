import React, { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import testProfilePic from "../../assets/user (1).png";
import { useSelector } from "react-redux/es";


const ProfileDropdown = ({ isOpen, toggleOpen, children }) => {
  const node = useRef();
  const { currentUser } = useSelector((state) => state.user);
  const userData = currentUser.user;

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    toggleOpen();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={node}>
      <button onClick={toggleOpen} className="flex items-center gap-2">
        <div className="ProfilePicDiv ">
          <img
            src={userData.profileImage ? userData.profileImage : testProfilePic}
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
