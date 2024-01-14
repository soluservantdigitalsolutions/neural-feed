import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaStickyNote,
  FaRegStickyNote,
} from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";


const BottomNavbar = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 w-full transition bg-green-800 p-4 flex justify-around items-center">
      <Link to="/" className="text-white transition">
        {location.pathname === "/" ? (
          <FaHome size={24} className="transition" />
        ) : (
          <IoHomeOutline size={24} className="transition" />
        )}
      </Link>
      <Link to="/notes" className="text-white">
        {location.pathname === "/notes" ? (
          <FaStickyNote size={24} className="transition" />
        ) : (
          <FaRegStickyNote size={24} className="transition" />
        )}
      </Link>
    </div>
  );
};

export default BottomNavbar;
