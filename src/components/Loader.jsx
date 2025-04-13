import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] space-y-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      <div>
        <p className="text-gray-600 font-medium">
          Loading... Please wait, it may take some time.
        </p>
      </div>
    </div>
  );
};

export default Loader;
