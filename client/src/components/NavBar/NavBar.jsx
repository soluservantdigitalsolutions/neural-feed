import React, { useState } from 'react';
import Logo from '../Logo/Logo';
import FormInput from '../formInput/FormInput';
import SubmitBtn from '../SubmitButton/SubmitBtn';
import { FaRegHandPaper } from 'react-icons/fa';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
import { Auth } from '../../../firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiFillNotification } from 'react-icons/ai';
import DropdownMenu from '../DropdownMenu.jsx/DropdownMenu';
import { signOut } from 'firebase/auth';
import { AiOutlineLogout } from 'react-icons/ai';


const NavBar = () => {
  const [user] = useAuthState(Auth);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const signOutUser =()=>{
    signOut(Auth).then(()=>{
        console.log("Uuser has been Signed Out");
    }).catch((err)=>{
        console.log(err);
    })
  }
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
          <SubmitBtn
            ButtonText="+ FEED"
            className="p-1"
            
          />
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
                console.log('HELLO');
              }}
            />
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
