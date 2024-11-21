import { auth } from "../../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

// Signup function
const signup = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Login function
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Password reset function
const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: "Password reset email sent." };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Logout function
const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export { signup, login, resetPassword, logout };