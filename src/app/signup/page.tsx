"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import { toast } from "react-hot-toast";
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
      const response = axios.post("/api/users/signup", user);
      console.log("signup response", response);
      router.push("/login");
      toast.success("User created successfully. Please login to continue.");
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
        {loading ? "Processing" : "Signup"}
      </h1>
      <hr />
      <label htmlFor="username">Username</label>
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
