import React, { useState } from "react";
import { signup, login, resetPassword } from "../utils/auth/authFunctions";
import gmailLogo from "../assets/logo/gmailLogo.svg";

const AuthenticationForm = ({
  isSigningUp,
  setError,
  isPasswordReset,
  setIsPasswordReset,
  setIsSigningUp,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const result = await signup(email, password);
    if (!result.success) {
      console.error(result.error);
      setError("Your credentials are incorrect.");
    } else {
      setError(null);
    }
  };

  const handleLogin = async () => {
    const result = await login(email, password);
    if (!result.success) {
      console.error(result.error);
      setError("Your credentials are incorrect.");
    } else {
      setError(null);
    }
  };

  const handlePasswordReset = async () => {
    const result = await resetPassword(email);
    if (!result.success) {
      console.error(result.error);
      setError("There was an issue resetting your password.");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md bg-white p-6 rounded-lg">
      <img src={gmailLogo} alt="Gmail Logo" className="w-12 h-12 ml-4" />

      {!isPasswordReset && (
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isSigningUp ? "Sign Up" : "Login"}
        </h2>
      )}

      {isPasswordReset ? (
        <>
          <p className="text-center mb-4">
            Enter your email to <br /> receive a password reset link.
          </p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handlePasswordReset}
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Send Reset Link
          </button>
          <div className="text-center mt-4">
            <a
              href="#"
              onClick={() => setIsPasswordReset(false)}
              className="text-blue-500 hover:text-blue-700"
            >
              Back to Login
            </a>
          </div>
        </>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />

          {isSigningUp && (
            <>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </>
          )}

          {!isSigningUp && (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          )}

          {isSigningUp ? (
            <button
              onClick={handleSignup}
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Sign Up
            </button>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-2"
              >
                Login
              </button>
              <button
                onClick={() => setIsPasswordReset(true)}
                className="w-full py-3 bg-gray-100 text-blue-500 rounded-md hover:bg-gray-200"
              >
                Forgot Password?
              </button>
              <div className="mt-4 text-center">
                <a
                  href="#"
                  onClick={() => setIsSigningUp(true)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Don't have an account? Sign up
                </a>
              </div>
            </>
          )}

          {isSigningUp && (
            <div className="text-center mt-4">
              <a
                href="#"
                onClick={() => setIsSigningUp(false)}
                className="text-blue-500 hover:text-blue-700"
              >
                Already have an account? Login
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AuthenticationForm;
