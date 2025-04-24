import React from "react";
import { Link } from "react-router-dom";

const Note = () => {
  return (
    <Link className="flex flex-col min-w-[40%] rounded-xl p-4 border-2 border-neutral-400 hover:border-white bg-transparent transition-all duration-300">
      <div className="flex justify-between items-center">
        <p className="text-white text-xl font-semibold">"No Pain, No Gain"</p>
        <p className="text-white">Kaze072</p>
      </div>

      <p className="text-neutral-400 mt-4 text-sm text-balance line-clamp-2">
        Progress often demands discomfort. Challenges, failures, and effort
        shape growth. Avoiding pain may feel safe, but it stalls development.
        Embrace struggle—it’s the price of success...
      </p>

      <h2 className="text-white text-sm mt-4">Updated 2 days ago</h2>
    </Link>
  );
};

export default Note;
