"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import { toast } from "react-hot-toast";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
const page = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup response", response);
      if (response.data.success) {
        router.push("/login");
        toast.success("User created successfully. Please login to continue.");
      } else {
        // Show the backend error message here if it exists
        toast.error(response.data.error || "Signup failed.");
      }
    } catch (error: any) {
      console.log(error.message);
      // Display the error message if it exists, otherwise show the generic message
      toast.error(
        error.response?.data?.error ||
          "Error signing up. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="px-16 py-18 z-1 flex flex-col justify-center items-center  
    bg-gray-900 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]  
    border-[2px] border-cyan-500/50 bg-clip-padding  
    relative before:absolute before:inset-0 before:-z-10 
    before:rounded-3xl before:border-[3px] before:border-cyan-300/70  
    before:blur-sm before:opacity-90 transition-all duration-300 
    hover:before:blur-md hover:before:opacity-100 text-gray-200"
    >
      <h1 className="text-3xl font-extrabold text-center text-[#661aca]">
        {loading ? "Processing" : "Sign Up"}
      </h1>
      <hr />
      <label className="pt-3" htmlFor="username">
        Username
      </label>
      <input
        className="border-2 border-gray-300 rounded-md p-2 mb-4"
        type="text"
        id="username"
        placeholder="Enter your username"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
      />
      <label className="pt-3" htmlFor="email">
        Email
      </label>
      <input
        className="border-2 border-gray-300 rounded-md p-2 mb-4"
        type="email"
        id="email"
        placeholder="Enter your email"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
      />
      <label className="pt-3" htmlFor="password">
        Password
      </label>
      <input
        className="border-2 border-gray-300 rounded-md p-2 mb-4"
        type="password"
        id="password"
        placeholder="Enter your username"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />
      <button
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none  focus:border-gray-600"
      >
        {buttonDisabled ? "No Sign Up" : "Sign Up"}
      </button>
      <Link href="/login">Visit Login Page</Link>
    </div>
  );
};

export default page;
