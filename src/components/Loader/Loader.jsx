import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-950">
      <div>
        <div>
          <h1 className="text-4xl text-white">Loading...</h1>
        </div>
        <div className="relative w-[200px] h-[10px]  rounded-md   bg-white mt-4 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-indigo-600 animate-slide"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
