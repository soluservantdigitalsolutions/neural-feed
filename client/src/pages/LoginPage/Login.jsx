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

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  console.log("login", currentUser);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(
        "https://neural-feed-backend.onrender.com/api/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(loginSuccess(res.data));
      navigate("/profile");
      console.log(res.data);
      setSucessMessage(res.data.message);

    } catch (err) {
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
                console.log({ username: username });
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
                console.log({ password: password });
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
