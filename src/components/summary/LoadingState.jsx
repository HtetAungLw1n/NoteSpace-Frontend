import React from "react";
import Loading from "../loading/Loading";

const LoadingState = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Loading />
      <p className="text-neutral-400 mt-4">Loading summary...</p>
    </div>
  );
};

export default LoadingState;
