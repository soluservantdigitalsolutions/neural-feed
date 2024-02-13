import React from "react";
import "./Navbar.css";
import nf_logo from "../../assets/Neural-removebg-preview.png";
import profile_logo from "../../../../client/src/assets/user (1).png";
import menu_icon from "../../assets/icons8-menu.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="side">
        <img src={menu_icon} alt="" height="30px" />
        <img src={nf_logo} alt="" className="logo" />
      </div>

      <div className="side">
        <button className="create">create</button>
        <img src={profile_logo} alt="" width="50px" />
      </div>
    </div>
  );
};

export default Navbar;
