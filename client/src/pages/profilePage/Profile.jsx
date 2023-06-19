import React from 'react';
import testProfilePic from "../../assets/user (1).png"

const Profile = () => {
  // const [user] = useAuthState(Auth);

  return (
    <div className="flex flex-col ">
      <div className="ProfileInfoAndStats flex flex-col justify-center items-center p-5 gap-5 border w-full">
        <div className="ProfilePicDiv ">
          <img
             src={testProfilePic}
            alt="testUser"
            className="rounded-full w-20"
          />
        </div>
        <div className="UserNameDiv">
          <h1 className="font-bold">This User</h1>
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
