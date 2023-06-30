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
import { ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSucessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      setSucessMessage(res.data.message);

      const currentUser = JSON.stringify(res);
      localStorage.setItem("currentUser", currentUser);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
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
        className="MainFormCard border p-5 rounded flex justify-center items-center flex-col gap-2.5 shadow-xl"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="LogoDiv ">
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
          <div className="googleButtonDiv">
            <GoogleButton onClick={signInWithGoogle} />
          </div>
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
