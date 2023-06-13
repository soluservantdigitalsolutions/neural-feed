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
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { username, email, password, confirmPassword } = inputValue;

  const HandleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    console.log(inputValue);
  };

  const handleError = (err) => {
    toast.error(err, {
      position: "bottom-left",
    });
  };
  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error.message);
    }
    setInputValue({
      ...inputValue,
      username:"",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const signInWithGoogle = () => {
    signInWithPopup(Auth, Provider)
      .then(() => {
        navigate("/profile");
        console.log("Signed In");
      })
      .catch((err) => {
        console.log(err);
      });
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
              inputType="name"
              inputPlaceholder="Username"
              LabelForName="username"
              inputName="username"
              value={username}
              onChange={HandleOnChange}
            />
            <FormInput
              inputType="email"
              inputPlaceholder="Email"
              Label="Email"
              LabelForName="email"
              inputName="email"
              value={email}
              onChange={HandleOnChange}
            />
            <FormInput
              inputType="password"
              inputPlaceholder="Password"
              Label="Password"
              LabelForName="password"
              inputName="password"
              value={password}
              onChange={HandleOnChange}
            />
            <FormInput
              inputType="password"
              inputPlaceholder="Confirm Password"
              Label="Password"
              LabelForName="password"
              inputName="confirmPassword"
              value={confirmPassword}
              onChange={HandleOnChange}
            />
            <SubmitBtn ButtonText="Join" />
          </form>
          <div className="googleButtonDiv">
            <GoogleButton onClick={signInWithGoogle} />
          </div>
          <div className="LoginQuestionDiv">
            <p>
              Already Have an Account?{" "}
              <a href="/login">
                <u>login</u>
              </a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
