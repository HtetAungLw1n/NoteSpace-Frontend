import React from "react";
import { Link } from "react-router-dom";

const NoteMenu = () => {
  return (
    <Link className="absolute top-6 right-2 hover:bg-neutral-700 cursor-pointer z-20 bg-neutral-800/50 backdrop-blur-sm text-sm rounded-lg text-center p-2 px-4">
      <div
        to="/"
        className="hover:bg-neutral-700 rounded-md cursor-pointer z-20"
      >
        Delete
      </div>
    </Link>
  );
};

export default NoteMenu;
