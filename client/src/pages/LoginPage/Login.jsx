/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Logo from "../../components/Logo/Logo";
import FormInput from "../../components/formInput/FormInput";
import SubmitBtn from "../../components/SubmitButton/SubmitBtn";
import GoogleButton from "react-google-button";
// import { signInWithGoogle } from '../../constants/GoogleAuthFunc/GoogleAuth';
import { useNavigate } from "react-router-dom";
import { Auth, Provider } from "../../../firebase.config";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import { BarLoader } from "react-spinners";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(
        "https://neural-feed-backend-2yg8.onrender.com/api/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setLoading(false);
      dispatch(loginSuccess(res.data));
      setSucessMessage(res.data.message);
      navigate("/");
    } catch (err) {
      setLoading(false);
      dispatch(loginFailure());
      console.log(err);
      setError(err.response.data.message);
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(Auth, Provider)
      .then(() => {
        navigate("/");
        console.log("Signed In");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <div className="p-5 border rounded-md">
          <BarLoader width={100} height={25} color="#38a169" />
          <h1>Logging you in, Please wait ...</h1>
        </div>
      </div>
    );

  return (
    <div className="main border ">
      <div
        className="MainFormCard h-full w-full p-5 rounded flex justify-center items-center flex-col gap-2.5 shadow-xl"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="LogoDiv w-92 ">
          <Logo />
        </div>
        <div className="FormDiv flex flex-col gap-2">
          <form
            action=""
            className="flex flex-col gap-2.5 "
            onSubmit={handleSubmit}
          >
            <FormInput
              inputType="name"
              inputPlaceholder="Username"
              Label="username"
              value={username}
              LabelForName="username"
              inputName="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <FormInput
              inputType="password"
              inputPlaceholder="Enter your password"
              Label="Password"
              value={password}
              LabelForName="password"
              inputName="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <SubmitBtn ButtonText="Login" />
          </form>
          {/* <div className="googleButtonDiv">
            <GoogleButton onClick={signInWithGoogle} />
          </div> */}
          <div className="SigUpQuestionDiv">
            <p>
              Don't have an account?{" "}
              <a href="/register">
                <u>Register</u>
              </a>
            </p>
          </div>
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
  );
};

export default Login;
