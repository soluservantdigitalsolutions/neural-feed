import React from 'react'
import Logo from '../../components/Logo/Logo';
import FormInput from '../../components/formInput/FormInput';
import SubmitBtn from '../../components/SubmitButton/SubmitBtn';
import GoogleButton from 'react-google-button';
// import { signInWithGoogle } from '../../GoogleAuthFunc/GoogleAuth';
import { useNavigate } from 'react-router-dom';
import { Auth, Provider } from '../../../firebase.config';
import { signInWithPopup } from 'firebase/auth';


const SignUp = () => {
    const navigate = useNavigate();

    const signInWithGoogle = () => {
      signInWithPopup(Auth, Provider)
        .then(() => {
          navigate('/profile');
          console.log('Signed In');
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
              inputType="name"
              inputPlaceholder="Name"
              Label="Email"
              LabelForName="email"
              inputName="email"
            />
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
            <FormInput
              inputType="password"
              inputPlaceholder="Confirm Password"
              Label="Password"
              LabelForName="password"
              inputName="password"
            />
            <SubmitBtn ButtonText="Join" />
          </form>
          <div className="googleButtonDiv">
            <GoogleButton onClick={signInWithGoogle}/>
          </div>
          <div className="LoginQuestionDiv">
            <p>
              Already Have an Account?{' '}
              <a href="/login">
                <u>login</u>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp