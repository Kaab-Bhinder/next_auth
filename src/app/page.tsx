import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="px-10 py-18 z-1 flex flex-col justify-center items-center  
  bg-gray-900 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]  
  border-[2px] border-cyan-500/50 bg-clip-padding  
  relative before:absolute before:inset-0 before:-z-10 
  before:rounded-3xl before:border-[3px] before:border-cyan-300/70  
  before:blur-sm before:opacity-90 transition-all duration-300 
  hover:before:blur-md hover:before:opacity-100 text-gray-200"
    >
      <h1 className="text-3xl font-extrabold text-center text-[#661aca] pb-10">
        Welcome to the Next.js 13.4 Authentication App Designed by Kaab
      </h1>

      <hr />
      <Link href="/login">
        <button className="bg-green-500 mt-4 px-6 hover:bg-green-700 text-white font-bold py-2 rounded min-w-3xl ">
          Login
        </button>
      </Link>
      <Link href="/signup">
        <button className="bg-blue-500 mt-4 px-6 hover:bg-blue-700 text-white font-bold py-2 rounded min-w-3xl">
          Sign Up
        </button>
      </Link>
    </div>
  );
}
