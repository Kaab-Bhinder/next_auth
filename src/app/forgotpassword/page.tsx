"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const page = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      const res = await axios.post("/api/users/forgetpassword", { email });
      setMessage(res.data.message || "Reset link sent to your email.");
      setEmail("");
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
        Forgot Password
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-green-500
          text-white hover:bg-green-600 transition duration-200 block mx-auto"
        >
          Send Reset Link
        </button>
      </form>

      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default page;
