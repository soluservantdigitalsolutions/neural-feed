import React, { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import testProfilePic from "../../assets/user (1).png";
import { useSelector } from "react-redux/es";
import { getUserProfile } from "../../api/api";
import { useState } from "react";

const ProfileDropdown = ({ isOpen, toggleOpen, children }) => {
  const node = useRef();
  const { currentUser } = useSelector((state) => state.user);
  const userData = currentUser.user;
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser) {
        try {
          const userInfo = await getUserProfile(userData._id);
          setUserProfile(userInfo);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserProfile();
  }, [currentUser]);

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
            src={
              userProfile?.profileImage
                ? userProfile.profileImage
                : testProfilePic
            }
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
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
          }}
          className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10"
        >
          {children}
        </div>
      </CSSTransition>
    </div>
  );
};

export default ProfileDropdown;
