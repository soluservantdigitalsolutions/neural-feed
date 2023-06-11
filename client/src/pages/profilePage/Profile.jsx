import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Auth } from '../../../firebase.config';

const Profile = () => {
  const [user] = useAuthState(Auth);

  return (
    <div className="flex flex-col ">
      <div className="ProfileInfoAndStats flex flex-col justify-center items-center p-5 gap-5 border w-full">
        <div className="ProfilePicDiv">
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="rounded-full"
          />
        </div>
        <div className="UserNameDiv">
          <h1 className="font-bold">{user.displayName}</h1>
        </div>
        <div className="userStatsDiv flex gap-5">
          <div className="Admissions">
            <span className="font-bold">50</span>
            <span className="font-thin"> Admissions</span>
          </div>
          <div className="StudentsDiv">
            <span className="font-bold">1,000</span>
            <span> Students</span>
          </div>
          <div className="GraduationHatsDiv">
            <span className="font-bold">4000</span>
            <span> Hats</span>
          </div>
        </div>
        <div className="BioDIV">
          <p>Test Bio</p>
        </div>
      </div>
      
    </div>
  );
};

export default Profile;
