import React from 'react';
import Logo from '../../components/Logo/Logo';
import FormInput from '../../components/formInput/FormInput';
import SubmitBtn from '../../components/SubmitButton/SubmitBtn';
import GoogleButton from 'react-google-button';
import { signInWithGoogle } from "../../GoogleAuthFunc/GoogleAuth";

const Login = () => {
  return (
    <div className="main border ">
      <div
        className="MainFormCard border p-5 rounded flex justify-center items-center flex-col gap-2.5 shadow-xl"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="LogoDiv ">
          <Logo />
        </div>
        <div className="FormDiv flex flex-col gap-2">
          <form
            action=""
            className="flex flex-col gap-2.5 "
          >
            <FormInput
              inputType="email"
              inputPlaceholder="Email"
              Label="Email"
              LabelForName="email"
              inputName="email"
            />
            <FormInput
              inputType="password"
              inputPlaceholder="Password"
              Label="Password"
              LabelForName="password"
              inputName="password"
            />
            <SubmitBtn ButtonText="Login" />
          </form>
          <div className="googleButtonDiv">
            <GoogleButton onClick={signInWithGoogle} />
          </div>
          <div className="SigUpQuestionDiv">
            <p>
              Don't have an account?{' '}
              <a href="/register">
                <u>Register</u>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
