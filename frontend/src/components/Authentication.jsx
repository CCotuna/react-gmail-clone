import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { signup, login, resetPassword, logout } from "../utils/auth/authFunctions";

const Authentication = () => {
 
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignup = async () => {
    const result = await signup(email, password);
    setError(result.success ? null : result.error);
  };

  const handleLogin = async () => {
    const result = await login(email, password);
    setError(result.success ? null : result.error);
  };

  const handlePasswordReset = async () => {
    const result = await resetPassword(email);
    setError(result.success ? result.message : result.error);
  };

  const handleLogout = async () => {
    const result = await logout();
    setError(result.success ? null : result.error);
  };

  return (
    <div className="auth-container">
      {user ? (
        <>
          <p>Welcome, {user.email}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <h2>{isSigningUp ? "Sign Up" : "Login"}</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isSigningUp ? (
            <button onClick={handleSignup}>Sign Up</button>
          ) : (
            <>
              <button onClick={handleLogin}>Login</button>
              <button onClick={handlePasswordReset}>Forgot Password?</button>
            </>
          )}
          <button onClick={() => setIsSigningUp(!isSigningUp)}>
            {isSigningUp ? "Switch to Login" : "Switch to Sign Up"}
          </button>
        </>
      )}
    </div>
  );
};

export default Authentication;
