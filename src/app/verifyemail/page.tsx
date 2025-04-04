"use client";
import React, { use } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { div } from "motion/react-m";
const page = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken) {
      setToken(urlToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  const verifyUserEmail = async () => {
    if (!token) return; // Ensure token is available before calling the API
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (err: any) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `Token: ${token}` : "No token found"}
      </h2>

      {verified && (
        <>
          <p className="text-green-600">Email Verified Successfully!</p>
          <Link href="/login">Proceed to login</Link>
        </>
      )}
      {error && (
        <>
          <p className="text-red-600">Error verifying email</p>
          <Link href="/signup">
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
              Go Home
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default page;
