import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDlOVr6qUe8ZvtFRkMLcdh9LWazBk7gLy8",
  authDomain: "secondlife-e85d4.firebaseapp.com",
  projectId: "secondlife-e85d4",
  storageBucket: "secondlife-e85d4.firebasestorage.app",
  messagingSenderId: "819469013262",
  appId: "1:819469013262:web:eed27a2c79c7051b59875f",
  measurementId: "G-PSP6XC8E7H"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();