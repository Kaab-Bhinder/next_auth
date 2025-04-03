import React from "react";
const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row justify-center items-center min-h-screen bg-red-100">
      {children}
    </div>
  );
};

export default Container;
