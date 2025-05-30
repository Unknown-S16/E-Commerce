import { useState } from "react";
import { signInWithGoogle } from "./firebase";

function LoginPage() {
  const [error, setError] = useState("");

  const googleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      const API = "https://e-commerce-zqyw.onrender.com";

      // Send user data to backend
      await fetch(`${API}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          googleId: user.uid,
        }),
      });

      // Redirect to profile page after successful login
      window.location.href = "/profile";
    } catch (err) {
      console.error("Google login error", err);
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md flex flex-col justify-center mx-auto mt-[5%] p-[5%] bg-violet-200 shadow-lg rounded-xl h-100 space-y-4">
      <h2 className="text-2xl font-semibold text-center">SignIn</h2>

      <button
        onClick={googleLogin}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
      >
        Sign in with Google
      </button>

      {error && (
        <div className="text-red-600 font-medium text-center mt-2">
          {error}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
