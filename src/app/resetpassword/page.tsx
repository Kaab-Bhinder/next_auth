"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Get the token from the URL search parameters
  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken) {
      setToken(urlToken); // Store token from the URL
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const res = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });

      setMessage(res.data.message || "Password reset successful!");
      // Optionally, redirect user to login page after success
      setTimeout(() => {
        router.push("/login"); // Redirect to login page
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div
      className="px-10 py-18 z-1 flex flex-col justify-center items-center  
    bg-gray-900 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]  
    border-[2px] border-cyan-500/50 bg-clip-padding  
    relative before:absolute before:inset-0 before:-z-10 
    before:rounded-3xl before:border-[3px] before:border-cyan-300/70  
    before:blur-sm before:opacity-90 transition-all duration-300 
    hover:before:blur-md hover:before:opacity-100 text-gray-200"
    >
      <h1 className="text-3xl font-extrabold text-center text-[#661aca] pb-5">
        Reset Your Password
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input
          type="password"
          placeholder="Enter your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-green-500
          text-white hover:bg-green-600 transition duration-200 block mx-auto"
        >
          Reset Password
        </button>
      </form>

      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default ResetPasswordPage;
