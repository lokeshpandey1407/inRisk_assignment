import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <nav className=" flex justify-start items-center top-0 width-full h-20 text-white p-4 fixed left-0 right-0 bg-white">
      <Image
        src={"./logo.svg"}
        height={1000}
        width={1000}
        alt="Logo"
        className="h-25 w-40"
      />
    </nav>
  );
};

export default Navbar;
