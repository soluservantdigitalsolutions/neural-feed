import React from "react";
import "../Sidebar/Sidebar.css";
import { SideBarData } from "./SidebarData";
import profile_logo from "../../../../client/src/assets/user (1).png";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="profile">
        <img src={profile_logo} alt="" width="100px" />
        <h2>User name</h2>
      </div>
      <ul className="sidebarlist">
        {SideBarData.map((item, index) => (
          <li key={index}>
            <a href={item.link}>
              <item.icom />
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
