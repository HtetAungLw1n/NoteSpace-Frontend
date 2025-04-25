import React from "react";

const Error = () => {
  return (
    <div className="h-screen flex justify-center items-center relative overflow-hidden">
      <div className="text-white text-[120vh] font-semibold absolute top-0 left-0 w-full h-full flex justify-center items-center">
        404
      </div>
      <div className="text-primary bg-black w-fit h-fit px-4 py-2 rounded-full text-4xl font-semibold z-10">
        <div> We couldn't find this page</div>
      </div>
    </div>
  );
};

export default Error;
