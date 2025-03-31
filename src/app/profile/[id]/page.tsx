import React from "react";

const page = ({ params }: any) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile Page
        {params.id}
      </p>
    </div>
  );
};

export default page;
