import React from 'react';
import { CgProfile } from 'react-icons/cg';
import {AiOutlineLogout} from "react-icons/ai"
import { Auth } from '../../../firebase.config';
import { signOut } from 'firebase/auth';

 
const DropdownMenu = (props) => {

  const signOutUser =()=>{
    signOut(Auth).then(()=>{
        console.log("Uuser has been Signed Out");
    }).catch((err)=>{
        console.log(err);
    })
  }
  return (
    <div className="ProfileMenuItemsDiv transition rounded absolute right-0 top-14 m-3 shadow-xl border text-green-600 bg-transparent w-48">
      <nav>
        <ul>
          <li
            className=" p-2 transition-all  cursor-pointer flex items-center gap-3 hover:bg-green-600 hover:text-white hover:rounded"
            onClick={props.onClick}
          >
            <span>
              <CgProfile className="text-3xl" />
            </span>
            View Profile
          </li>
          <li
            className=" p-2 transition-all  cursor-pointer flex items-center gap-3 hover:bg-green-600 hover:text-white hover:rounded"
            onClick={signOutUser}
          >
            <span>
              <AiOutlineLogout className="text-3xl" />
            </span>
            Log out
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DropdownMenu;
