import React, { useEffect, useState } from "react";
import testProfilePic from "../../assets/user (1).png";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import { useSelector } from "react-redux/es";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import axios from "axios";

const UserProfile = () => {
  // const [user] = useAuthState(Auth);
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  console.log("params", username);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/profile/${username}`
        );
        setLoading(false);
        setUser(res.data.user);
        console.log(res);
        console.log("profileUser", user);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    getUserProfile();
  }, [username]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <BarLoader
          width={100}
          height={25}
          color="#38a169"
        />
      </div>
    );
  return (
    <div className="flex flex-col ">
      <div className="ProfileInfoAndStats flex flex-col justify-center items-center p-5 gap-5 border w-full">
        <div className="ProfilePicDiv ">
          <img
            src={user && user.profileImage ? user.profileImage : testProfilePic}
            alt="testUser"
            className="rounded-full w-[100px] h-[100px] object-cover"
          />
        </div>
        <div className="UserNameDiv">
          <h1 className="font-bold">{user && user.username}</h1>
        </div>
        <div className="userStatsDiv flex gap-5">
          <div className="Admissions">
            <span className="font-bold">
              {user && user.enrollments && user.enrollments.length}
            </span>
            <span className="font-thin"> Enrollments</span>
          </div>
          <div className="StudentsDiv">
            <span className="font-bold">
              {user && user.admissions && user.admissions.length}
            </span>
            <span> Admissions</span>
          </div>
          <div className="GraduationHatsDiv">
            <span className="font-bold">
              {user && user.hats && user.hats.length}
            </span>
            <span> Hats</span>
          </div>
        </div>
        {/* <div className="BioDIV">
          <SecondaryButton SecondaryButtonText="Edit Profile" />
        </div> */}
        <div className="BioDIV">
          <p>{user && user.bio ? user.bio : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
