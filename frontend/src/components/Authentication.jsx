import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import AuthenticationForm from "./AuthenticationForm";

const Authentication = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/tempBg3.jpg')" }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-lg">
        {user ? 
        "" : (
          <>
            {error && <p className="text-blue-500 text-center mb-4">{error}</p>}
            <AuthenticationForm
              isSigningUp={isSigningUp}
              setError={setError}
              isPasswordReset={isPasswordReset}
              setIsPasswordReset={setIsPasswordReset}
              setIsSigningUp={setIsSigningUp}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Authentication;
