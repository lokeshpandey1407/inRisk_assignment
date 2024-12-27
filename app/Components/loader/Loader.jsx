import React from "react";

const Loader = ({size = 12}) => {
  return (
    <div className="h-auto flex justify-center items-center">
      <div
        className={`border-8 rounded-full border-t-transparent border-b-transparent border-blue-500 h-${size} w-${size} bg-transparent animate-spin`}
      ></div>
    </div>
  );
};

export default Loader;
