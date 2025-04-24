import React, { useState } from "react";
import { signInWithGoogle } from "./firebase"; // Ensure this is correctly set up
function LoginPage() {
  const [error, setError] = useState(""); // Track error messages

  const googleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      
      // Send user data to backend for processing
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,  // Google photoURL
          googleId: user.uid,
        }),
        credentials: "include",
      });

      const data = await res.json();
      console.log("Backend response:", data);
      console.log("User photo URL:", user.photoURL);

      
      // Save token in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
        // Redirect to profile page after successful login
        window.location.href = "/profile";

      }
    } catch (err) {
      console.error("Google login error", err);
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md flex flex-col justify-center mx-auto mt-[5%] p-[5%]  bg-violet-200 shadow-lg rounded-xl h-100  space-y-4">
      <h2 className="text-2xl font-semibold text-center">SignIn</h2>
 
      {/* Google Sign-In Button */}
      <button
        onClick={googleLogin}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
      >
        Sign in with Google
      </button>

      {/* Error message if any */}
      {error && (
        <div className="text-red-600 font-medium text-center mt-2">
          {error}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
