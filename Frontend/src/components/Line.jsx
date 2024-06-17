import React from "react";

const Line = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[100%] h-[1px] bg-[#b9b9b9] opacity-20 my-4 rounded-lg"></div>
      <span className="px-4">or</span>{" "}
      <div className="w-[100%] h-[1px] bg-[#b9b9b9] opacity-20 my-4 rounded-lg"></div>
    </div>
  );
};

export default Line;
