"use client";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const params = useParams();
  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Logout successful");
      console.log(response.data);
      router.push("/login");
    } catch (err: any) {
      console.log(err.message);
      toast.error(err.message);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile Page
        {params.id}
      </p>
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 px-6 hover:bg-blue-700 text-white font-bold py-2 rounded not-last:"
      >
        logout
      </button>
    </div>
  );
};

export default page;
