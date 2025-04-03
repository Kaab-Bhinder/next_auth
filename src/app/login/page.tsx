"use client";
import React, { use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import toast from "react-hot-toast";
import Container from "@/components/container";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login response", response);
      if (response.data.success) {
        router.push("/profile");
        toast.success("Login successful. Welcome back!");
      } else {
        toast.error(response.data.error);
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error("Error signing up. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <BackgroundBeamsWithCollision
      className=" 
    bg-slate-800
 z-0 min-h-screen w-screen flex justify-center items-center"
    >
      <div
        className="px-10 py-18 z-1 flex flex-col justify-center items-center  
  bg-gray-900 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]  
  border-[2px] border-cyan-500/50 bg-clip-padding  
  relative before:absolute before:inset-0 before:-z-10 
  before:rounded-3xl before:border-[3px] before:border-cyan-300/70  
  before:blur-sm before:opacity-90 transition-all duration-300 
  hover:before:blur-md hover:before:opacity-100 text-gray-200"
      >
        <h1 className="text-3xl font-extrabold text-center text-[#661aca]">
          {" "}
          {loading ? "Processing" : "Log In"}
        </h1>
        <hr />

        <label className="  pt-3" htmlFor="email">
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
          onClick={onLogin}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-gray-600"
        >
          Login Button
        </button>
        <Link href="/signup">Visit Sign Up Page</Link>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default page;
