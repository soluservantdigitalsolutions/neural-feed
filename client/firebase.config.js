// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCD_pxrvtH-36oENiRsdZL1T3Pn-7310Ko',
  authDomain: 'neural-feed-90678.firebaseapp.com',
  projectId: 'neural-feed-90678',
  storageBucket: 'neural-feed-90678.appspot.com',
  messagingSenderId: '220438956273',
  appId: '1:220438956273:web:8c3530cd0f62d5c5980150',
  measurementId: 'G-L1EXLESFE2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const Auth = getAuth(app)
const Provider = new GoogleAuthProvider()

export {Auth, Provider}
