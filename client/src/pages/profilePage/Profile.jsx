import React from "react";
import testProfilePic from "../../assets/user (1).png";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import { useSelector } from "react-redux/es";

const Profile = () => {
  // const [user] = useAuthState(Auth);

  const { currentUser } = useSelector((state) => state.user);
  const userData = currentUser.user;
  console.log("UserData", userData);

  return (
    <div className="flex flex-col ">
      <div className="ProfileInfoAndStats flex flex-col justify-center items-center p-5 gap-5 border w-full">
        <div className="ProfilePicDiv ">
          <img
            src={userData.profileImage ? userData.profileImage : testProfilePic}
            alt="testUser"
            className="rounded-full w-[100px] h-[100px] object-cover"
          />
        </div>
        <div className="UserNameDiv">
          <h1 className="font-bold">{userData.username}</h1>
        </div>
        <div className="userStatsDiv flex gap-5">
          <div className="Admissions">
            <span className="font-bold">{userData.enrollments.length}</span>
            <span className="font-thin"> Enrollments</span>
          </div>
          <div className="StudentsDiv">
            <span className="font-bold">{userData.admissions.length}</span>
            <span> Admissions</span>
          </div>
          <div className="GraduationHatsDiv">
            <span className="font-bold">{userData.hats.length}</span>
            <span> Hats</span>
          </div>
        </div>
        {/* <div className="BioDIV">
          <SecondaryButton SecondaryButtonText="Edit Profile" />
        </div> */}
        <div className="BioDIV">
          <p>{userData.bio ? userData.bio : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
