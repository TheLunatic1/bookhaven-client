import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCurrtDN82gi75h1cNFsPQR5nPe9Q0uEeM",
  authDomain: "bookhaven-client.firebaseapp.com",
  projectId: "bookhaven-client",
  storageBucket: "bookhaven-client.firebasestorage.app",
  messagingSenderId: "206024790467",
  appId: "1:206024790467:web:86c00b021b9d21257bad76",
  measurementId: "G-8KWYLHNCQ8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();