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
    <div
      className="px-16 py-18 z-1 flex flex-col justify-center items-center  
    bg-gray-900 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]  
    border-[2px] border-cyan-500/50 bg-clip-padding  
    relative before:absolute before:inset-0 before:-z-10 
    before:rounded-3xl before:border-[3px] before:border-cyan-300/70  
    before:blur-sm before:opacity-90 transition-all duration-300 
    hover:before:blur-md hover:before:opacity-100 text-gray-200"
    >
      <h1 className="text-3xl font-extrabold text-center text-[#661aca] pb-5">
        Profile
      </h1>
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
