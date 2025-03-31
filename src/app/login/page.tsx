"use client";
import React, { use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import toast from "react-hot-toast";

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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-2xl text-center text-amber-500">
        {" "}
        {loading ? "Processing" : "Log In"}
      </h1>
      <hr />

      <label htmlFor="email">email</label>
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
      <label htmlFor="password">password</label>
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
  );
};

export default page;
