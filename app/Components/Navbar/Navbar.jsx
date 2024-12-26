"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState("");
  function getCurrentTime() {
    setCurrentTime(new Date());
  }
  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentTime();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <nav className=" flex justify-between items-center top-0 width-full h-20 text-white p-4 fixed left-0 right-0 bg-white">
      <Image
        src={"./logo.svg"}
        height={1000}
        width={1000}
        alt="Logo"
        className="h-25 w-40"
      />
      <div className="flex flex-col text-black">
        <p className=" text-sm">
          {currentTime &&
            new Date(currentTime).toLocaleDateString("en-Us", {
              dateStyle: "medium",
            })}
        </p>
        <p className=" text-sm">
          {currentTime &&
            new Date(currentTime).toLocaleTimeString("en-Us", {
              timeStyle: "medium",
            })}
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
