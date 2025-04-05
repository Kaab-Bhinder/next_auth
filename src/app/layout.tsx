import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Authentication App",
  description: "Designed by Kaab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <BackgroundBeamsWithCollision
          className=" 
    bg-slate-800
 z-0 min-h-screen w-screen flex justify-center items-center"
        >
          {children}
          <Toaster position="top-center" reverseOrder={false} />
        </BackgroundBeamsWithCollision>
      </body>
    </html>
  );
}
