import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD90BdD5ZAYTkqCpDsELsr_zM62rmUXRuk",
  authDomain: "recipe-auth-6adc7.firebaseapp.com",
  projectId: "recipe-auth-6adc7",
  storageBucket: "recipe-auth-6adc7.firebasestorage.app",
  messagingSenderId: "498406776477",
  appId: "1:498406776477:web:c642d1567d514beff83e74",
  measurementId: "G-5RWWYBJXNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();