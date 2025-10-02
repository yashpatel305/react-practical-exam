// src/services/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase"; // adjust path if needed

export const emailSignUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const emailSignIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const googleSignIn = () => signInWithPopup(auth, googleProvider);

export const logout = () => signOut(auth);
