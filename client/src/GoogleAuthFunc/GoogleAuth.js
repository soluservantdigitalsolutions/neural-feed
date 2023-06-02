import { useNavigate } from 'react-router-dom';
import { Auth, Provider } from '../../firebase.config';
import { signInWithPopup } from 'firebase/auth';

export const signInWithGoogle = () => {
  const navigate = useNavigate();
  signInWithPopup(Auth, Provider)
    .then(() => {
      console.log('Signed In');
      navigate("/")
    })
    .catch((err) => {
      console.log(err);
    });
};
