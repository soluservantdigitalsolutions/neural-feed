import React from "react";
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
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        return setError("Passwords do not match");
      }
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setSuccessMessage("User has been registered successfully");
      console.log(res);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main border">
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
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col gap-2.5 "
          >
            <FormInput
              inputType="username"
              inputPlaceholder="Username"
              LabelForName="username"
              inputName="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                console.log({ username: username });
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
                console.log({ email: email });
              }}
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
                console.log({ password: password });
              }}
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
                console.log({ confirmPassword: confirmPassword });
              }}
            />
            <SubmitBtn
              disabled=""
              ButtonText="Join"
            />
          </form>
          <div className="googleButtonDiv flex justify-center items-center">
            <GoogleButton />
          </div>
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
