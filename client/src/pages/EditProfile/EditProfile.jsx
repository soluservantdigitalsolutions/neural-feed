import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { useSelector } from "react-redux";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import { getUserProfile, updateUserProfile } from "../../api/api";
import { useEffect } from "react";

const EditProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState(currentUser.user);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userData = await getUserProfile(user._id);
        setUser(userData);
        console.log(userData);
        setUsername(userData.username);
        setEmail(userData.email);
        setBio(userData.bio);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user._id]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    formData.append("bio", bio);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await updateUserProfile(user._id, formData);

      console.log(response);
      // navigate(`/profile/${newUserInfo.username}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <div className="p-5 border rounded-md flex justify-center items-center flex-col shadow">
          <BarLoader width={100} height={25} color="#38a169" />
          <h1>Updating your profile in a moment, Please wait ...</h1>
        </div>
      </div>
    );

  return (
    <div className="MainFormCard border p-5 rounded flex justify-center flex-col gap-2.5 shadow-xl m-5">
      <form onSubmit={handleSubmit}>
        <div className="UploadDetailsDiv w-full flex flex-col gap-5">
          <div className="captionDiv ">
            <h1 className="Caption font-semibold">Profile Image</h1>
            <div className="flex justify-center items-center">
              <img
                src={profileImage || user?.profileImage}
                alt="testUser"
                className="rounded-full w-[100px] m-5 h-[100px] object-cover"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="outline-none hidden border rounded p-3 w-full"
              id="profileImage"
            />
            <label htmlFor="profileImage" className="cursor-pointer">
              <div
                className="cursor-pointer"
                onClick={() => document.getElementById("profileImage").click()}
              >
                <div className="border-green-600 border hover:bg-green-600 text-green-600 transition hover:text-white text-center  rounded-md p-2.5">
                  Change Photo
                </div>
              </div>
            </label>
          </div>
          <div className="captionDiv">
            <h1 className="Caption font-semibold">Username</h1>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="outline-none border rounded p-3 w-full"
            />
          </div>
          <div className="captionDiv">
            <h1 className="Caption font-semibold">Email</h1>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none border rounded p-3 w-full"
            />
          </div>
          <div className="captionDiv">
            <h1 className="Caption font-semibold">Old Password</h1>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="outline-none border rounded p-3 w-full"
            />
          </div>
          <div className="captionDiv">
            <h1 className="Caption font-semibold">New Password</h1>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="outline-none border rounded p-3 w-full"
            />
          </div>

          <div className="captionDiv">
            <h1 className="Caption font-semibold">Bio</h1>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="outline-none border rounded p-3 w-full"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white rounded-md p-2.5"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
