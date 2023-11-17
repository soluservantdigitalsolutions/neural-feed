import React, { useEffect } from "react";
import Logo from "../../components/Logo/Logo";
import FormInput from "../../components/formInput/FormInput";
import SubmitBtn from "../../components/SubmitButton/SubmitBtn";
import GoogleButton from "react-google-button";
// import { signInWithGoogle } from '../../GoogleAuthFunc/GoogleAuth';
import { useNavigate } from "react-router-dom";
import { Auth, Provider } from "../../../firebase.config";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import addProfilePhoto from "../../assets/addProfilePhoto.png";
import axios from "axios";
import UploadVideo from "../../utils/upload";
import { BarLoader } from "react-spinners";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [profileImgPreview, setProfileImgPreview] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  useEffect(() => {
    // Revoke the old feed preview Blob URL
    return () => URL.revokeObjectURL(profileImgPreview);
  }, [profileImgPreview]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const url = await UploadVideo(profileImg);
      setProfileImg(url);
      if (password !== confirmPassword) {
        return setError("Passwords do not match");
      }
      const res = await axios.post(
        "https://neural-feed-backend.onrender.com/api/auth/register",
        {
          username,
          email,
          password,
          profileImage: url,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);

      setSuccessMessage("User has been registered successfully");
      navigate("/login");
    } catch (err) {
      setLoading(false);

      console.log(err);
    }
  };

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
    <div className="main ">
      <div
        className="MainFormCard h-full w-full p-5 rounded flex justify-center items-center flex-col gap-2.5 shadow-xl"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}>
        <div className="LogoDiv ">
          <Logo />
        </div>
        <div className="FormDiv flex flex-col gap-2">
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col gap-2.5 ">
            <label
              htmlFor="ProfileImg"
              className="flex self-center border border-slate-400  rounded-full cursor-pointer">
              <img
                src={profileImgPreview ? profileImgPreview : addProfilePhoto}
                alt=""
                className=" rounded-full w-24 h-24 object-cover"
              />
              <input
                type="file"
                id="ProfileImg"
                className="hidden rounded-full"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setProfileImgPreview(URL.createObjectURL(file));
                  setProfileImg(file);
                }}
              />
            </label>
            <p className="text-center font-bold">Add Profile Picture</p>

            <FormInput
              inputType="username"
              inputPlaceholder="Username"
              LabelForName="username"
              inputName="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <FormInput
              inputType="email"
              inputPlaceholder="Email"
              Label="Email"
              LabelForName="email"
              inputName="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoComplete="false"
            />
            <FormInput
              inputType="password"
              inputPlaceholder="Password"
              Label="Password"
              LabelForName="password"
              inputName="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="false"
            />
            <FormInput
              inputType="password"
              inputPlaceholder="Confirm Password"
              Label="Password"
              LabelForName="password"
              inputName="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <SubmitBtn
              disabled=""
              ButtonText="Join"
            />
          </form>
          {/* <div className="googleButtonDiv flex justify-center items-center">
            <GoogleButton />
          </div> */}
          <div className="LoginQuestionDiv">
            <p>
              Already Have an Account?{" "}
              <a href="/login">
                <u>login</u>
              </a>
            </p>
          </div>
          {error ? (
            <div className=" p-2.5 bg-red-300 border-2 border-red-500 ">
              {error}
            </div>
          ) : (
            <div className="  bg-green-300 border-2 border-green-500 ">
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
