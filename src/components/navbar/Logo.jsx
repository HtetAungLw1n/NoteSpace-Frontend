import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <h1 className="text-2xl font-bold text-secondary py-2 font-orbitron">
        NoteSpace
      </h1>
    </Link>
  );
};

export default Logo;
