"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");
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
  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response.data);
      setData(response.data.data._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  useEffect(() => {
    if (data !== "nothing") {
      router.push(`/profile/${data}`);
    }
  }, [data]);

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <h1>Profie</h1>
        <hr />

        <p>Profile Page </p>
        <h2 className="p-3 rounded bg-green-500">
          {data === "nothing" ? (
            "nothing"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </h2>
        <button
          onClick={logout}
          className="bg-blue-500 mt-4 px-6 hover:bg-blue-700 text-white font-bold py-2 rounded not-last:"
        >
          logout
        </button>
        <button
          onClick={getUserDetails}
          className="bg-green-500 mt-4 px-6 hover:bg-blue-700 text-white font-bold py-2 rounded not-last:"
        >
          Get User DetailS
        </button>
      </div>
    </>
  );
};

export default page;
